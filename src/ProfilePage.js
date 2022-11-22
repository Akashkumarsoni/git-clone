import {
  Badge,
  Button,
  Card,
  Icon,
  Page,
  Tabs,
  TopBar,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import "./Profile.css";
import PeopleIcon from "@mui/icons-material/People";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { connect } from "react-redux";
import { mapDispatchtoprops, mapStatetoprops } from "./redux/git/Mapping";
const ProfilePage = (props) => {
  console.log(props.personalprofile);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selected, setSelected] = useState(0);
  const [gitrepos, setGitrepos] = useState([]);

  React.useEffect(() => {
    const url = props.personalprofile["repos_url"];
    const fetchAPI = async () => {
      const data = await fetch(url);
      const result = await data.json();
      setGitrepos(result);
      console.log(result);
    };
    fetchAPI();
  }, []);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  console.log(selected);
  const tabs = [
    {
      id: "all-customers-fitted-3",
      content: <span>Overviews</span>,
    },
    {
      id: "accepts-marketing-fitted-3",
      content: (
        <span>
          Repositories{" "}
          <Badge status="new">{props.personalprofile["public_repos"]}</Badge>
        </span>
      ),
    },
    {
      id: "dfgdfgdfg",
      content: (
        <span>
          Projects <Badge status="new">0</Badge>
        </span>
      ),
    },
  ];
  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);
  return (
    <div>
      {/* Navbar */}
      <div>
        <div className="uppernav">
          <div className="leftpart">
            <span className="hamburger">
              <i class="fa-sharp fa-solid fa-bars"></i>
            </span>
            <img
              className="gitlogo"
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/919/919847.png"
            />
            <TopBar.SearchField
              onChange={handleSearchChange}
              value={searchValue}
              placeholder="Search"
              showFocusBorder
            />
            <p>Pull&nbsp;Request</p>
            <p>Issues</p>
            <p>Marketplace</p>
            <p>Explore</p>
          </div>
          <div className="rightpart">
            <i
              class="fa-solid fa-bell"
              style={{ color: "white", fontSize: "25px" }}
            ></i>
            <i
              class="fa-solid fa-plus"
              style={{ color: "white", fontSize: "25px" }}
            ></i>
            <img alt="" src={props.personalprofile["avatar_url"]} />
          </div>
        </div>
      </div>

      <div className="contents">
        <div className="leftcontent">
          <img
            alt=""
            src={props.personalprofile["avatar_url"]}
            className="profilepic"
          />
          <p className="realname">{props.personalprofile["name"]}</p>
          <p className="username">{props.personalprofile["login"]}</p>
          <p className="about">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
          <div className="btns">
            <Button>Follow</Button>
            <Button disclosure="select">Sponsor</Button>
            <i class="fa-solid fa-ellipsis" style={{ fontSize: "20px" }}></i>
          </div>
          <div className="follows">
            <PeopleIcon />
            &nbsp; {props.personalprofile["followers"]} Followers&nbsp;{" "}
            {props.personalprofile["following"]} Following&nbsp;.&nbsp;
            <StarOutlineIcon /> {props.personalprofile["public_repos"]}
          </div>
          <div className="biodetail">
            <span className="rowss">
              <i
                class="fa-solid fa-location-dot"
                style={{ fontSize: "20px" }}
              ></i>
              &nbsp;:&nbsp;&nbsp; {props.personalprofile["location"]}
            </span>

            <span className="rowss">
              <i
                class="fa-regular fa-envelope"
                style={{ fontSize: "20px" }}
              ></i>
              &nbsp;:&nbsp;&nbsp;{props.personalprofile["email"]}
            </span>

            <span className="rowss">
              <i
                class="fa-sharp fa-solid fa-link"
                style={{ fontSize: "20px" }}
              ></i>
              &nbsp;:&nbsp;&nbsp; {props.personalprofile["company"]}
            </span>

            <span className="rowss">
              <i class="fa-brands fa-twitter" style={{ fontSize: "20px" }}></i>
              &nbsp;:&nbsp;&nbsp; {props.personalprofile["twitter_username"]}
            </span>
          </div>
        </div>

        <div className="rightcontent">
          <Card>
            <Tabs
              tabs={tabs}
              selected={selected}
              onSelect={handleTabChange}
              fitted
            >
              <Card>
                <>
                  {selected === 0 && (
                    <>
                      <Page>
                        <div className="paddingdiv">
                          <p className="sayhii">
                            Hii, I'm {props.personalprofile["name"]}
                          </p>
                          <div className="paddingdivin">
                            <p className="nameofuser">
                              {props.personalprofile["name"]}
                            </p>
                            <p className="aboutusr">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </p>
                          </div>
                          <p className="aboutcontent">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </p>
                        </div>
                      </Page>
                    </>
                  )}
                </>

                <>
                  {selected === 1 && (
                    <>
                      {gitrepos.map((k, index) => {
                        return (
                          <Page>
                            <div className="repodiv">
                              <p className="reponame">{k.name}</p>

                              <Button
                                connectedDisclosure={{
                                  accessibilityLabel: "Other save actions",
                                  actions: [{ content: "Save as draft" }],
                                }}
                              >
                                <i class="fa-regular fa-star"></i>&nbsp; Save
                              </Button>
                            </div>
                            <hr />
                          </Page>
                        );
                      })}
                    </>
                  )}
                </>

                <>
                  {selected === 2 && (
                    <>
                      <p className="noprojects">No projects available</p>
                    </>
                  )}
                </>
              </Card>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStatetoprops, mapDispatchtoprops)(ProfilePage);
