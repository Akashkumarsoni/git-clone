import {
  Avatar,
  Button,
  Card,
  ResourceItem,
  ResourceList,
  TextStyle,
} from "@shopify/polaris";
import "./App.css";
import React, { useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";
import { mapDispatchtoprops, mapStatetoprops } from "./Mapping";
import { Autocomplete, Icon } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { useNavigate } from "react-router-dom";

const Compo1 = (props) => {
  const navigate = useNavigate();
  const [suggession, setSuggession] = useState([]);
  const [showProfileDiv, setShowProfileDiv] = useState(false);
  const [profileBox, setProfileBox] = useState({});

  let arr = [];
  const fetch2API = async (url) => {
    const data = await fetch(url, {
      headers: {
        authorization: "Bearer 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",
      },
    });
    const result = await data.json();

    arr = [...arr, result];
    props.fetching_all_data2(arr);
  };

  React.useEffect(() => {
    const url = "https://api.github.com/users";
    const fetchAPI = async () => {
      const data = await fetch(url, {
        method: "GET",
        headers: {
          authorization: "Bearer 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",
        },
      });
      const result = await data.json();
      props.fetching_all_data(result);
      let sugg = [];
      result.map((i) => {
        fetch2API(`https://api.github.com/users/${i.login}`);
        sugg = [...sugg, { value: i.login, label: i.login }];
      });
      setSuggession(sugg);
    };
    fetchAPI();
  }, []);

  const deselectedOptions = suggession;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  React.useEffect(() => {
    if (selectedOptions.length !== 0) {
      // fetch(`https://api.github.com/users/${selectedOptions}`, {
      //   headers: {
      //     authorization: "Bearer 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",
      //   },
      // })
      //   .then((result) => result.json())
      //   .then((res) => {
      //     setProfileBox(res);
      //   })
      //   .then(() => setShowProfileDiv(true));
      const fetchdata = async()=>{
        const fet = await fetch(`https://api.github.com/users/${selectedOptions}`, {
        headers: {
          authorization: "Bearer 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",
        },
      })
      const response = await fet.json();
      setProfileBox(response);
      setShowProfileDiv(true);
      props.personalpro()
      }
    }
  }, [selectedOptions]);

  console.log("props.personalpro", props.personalpro);

  const showprofile = (e) => {
    window.location.href = e;
  };
  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );

  // React.useEffect(()=>{props.personalpro(profileBox)},[profileBox])
  const updateSelection = useCallback(
    (selected) => {
      setShowProfileDiv(false);
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0]);
    },
    [options]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Search here..."
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
    />
  );

  return (
    <>
      <header className="App-header">
        <div style={{ height: "125px", width: "550px" }}>
          <Autocomplete
            options={options}
            selected={selectedOptions}
            onSelect={updateSelection}
            textField={textField}
          />
        </div>
        {showProfileDiv === true ? (
          <>
            <Card sectioned>
              <ResourceList
                resourceName={{ singular: "customer", plural: "customers" }}
                items={[
                  {
                    url: profileBox["url"],
                    avatarSource: profileBox["avatar_url"],
                    name: profileBox["login"],
                  },
                ]}
                renderItem={(item) => {
                  const { id, url, avatarSource, name } = item;
                  return (
                    <ResourceItem
                      verticalAlignment="center"
                      id={id}
                      // url={url}
                      media={
                        <Avatar
                          customer
                          size="large"
                          name={name}
                          source={avatarSource}
                        />
                      }
                      accessibilityLabel={`View details for ${name}`}
                      name={name}
                    >
                      <>
                        <div>
                          <h6>
                            <TextStyle variation="strong">{name}</TextStyle>
                          </h6>
                          <div className="alldetails">
                            <p className="head2">Learning to learn</p>
                            <div className="threecolss">
                              <p>{profileBox["followers"]} Followers</p>
                              <p>{profileBox["following"]} Following</p>
                              <p>{profileBox["public_repos"]} Repos</p>
                            </div>
                            <Button
                              onClick={() => {
                                navigate("/profile");
                              }}
                              fullWidth
                            >
                              Show Profile
                            </Button>{" "}
                            &nbsp;
                            <Button
                              onClick={() => {
                                showprofile(profileBox["html_url"]);
                              }}
                              fullWidth
                            >
                              Show on GITHUB
                            </Button>
                          </div>
                        </div>
                      </>
                    </ResourceItem>
                  );
                }}
              />
            </Card>
          </>
        ) : (
          <>
            {props.userprofile.map((i, index) => {
              return (
                <Card sectioned key={index}>
                  <ResourceList
                    resourceName={{ singular: "customer", plural: "customers" }}
                    items={[
                      {
                        id: index,
                        url: i.url,
                        avatarSource: i.avatar_url,
                        name: i.login,
                      },
                    ]}
                    renderItem={(item) => {
                      const { id, url, avatarSource, name } = item;
                      return (
                        <ResourceItem
                          verticalAlignment="center"
                          id={id}
                          // url={url}
                          media={
                            <Avatar
                              customer
                              size="large"
                              name={name}
                              source={avatarSource}
                            />
                          }
                          accessibilityLabel={`View details for ${name}`}
                          name={name}
                        >
                          <>
                            {/* {props.userprofile.map((mahaitem, index2) => {
                        if (mahaitem.login === i.login) {
                          return ( */}
                            <div key={index}>
                              <h6>
                                <TextStyle variation="strong">{name}</TextStyle>
                              </h6>
                              <div className="alldetails">
                                <p className="head2">Learning to learn</p>
                                <div className="threecolss">
                                  <p>{i.followers} Followers</p>
                                  <p>{i.following} Following</p>
                                  <p>{i.public_repos} Repos</p>
                                </div>
                                {/* <Button
                                  onClick={() => {
                                    navigate("/profile")
                                  }}
                                  fullWidth
                                >
                                  Show Profile
                                </Button> */}
                                &nbsp;
                                <Button
                                  onClick={() => {
                                    showprofile(i.html_url);
                                  }}
                                  fullWidth
                                >
                                  Show on GITHUB
                                </Button>
                              </div>
                            </div>
                            {/* );
                        }
                      })} */}
                          </>
                        </ResourceItem>
                      );
                    }}
                  />
                </Card>
              );
            })}
          </>
        )}
      </header>
    </>
  );
};

export default connect(mapStatetoprops, mapDispatchtoprops)(Compo1);
