import { Badge, Button, Card, Page, Tabs, TopBar } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import "./Profile.css";
import PeopleIcon from "@mui/icons-material/People";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
const ProfilePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selected, setSelected] = useState(0);

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
          Repositories <Badge status="new">4000</Badge>
        </span>
      ),
    },
    {
      id: "dfgdfgdfg",
      content: (
        <span>
          Projects <Badge status="new">400</Badge>
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
            <img
              alt=""
              src="https://static.toiimg.com/thumb/msid-91130736,width-900,height-1200,resizemode-6.cms"
            />
          </div>
        </div>
      </div>

      <div className="contents">
        <div className="leftcontent">
          <img
            alt=""
            src="https://static.toiimg.com/thumb/msid-91130736,width-900,height-1200,resizemode-6.cms"
            className="profilepic"
          />
          <p className="realname">Tiger Shroff</p>
          <p className="username">tiger_shroff</p>
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
            &nbsp; 800 Followers&nbsp; 23 Following&nbsp;.&nbsp;
            <StarOutlineIcon /> 229
          </div>
          <div className="biodetail">
            <span className="rowss">
              <i
                class="fa-solid fa-location-dot"
                style={{ fontSize: "20px" }}
              ></i>
              &nbsp;:&nbsp;&nbsp; Lorem ipsum dolor sit amet
            </span>

            <span className="rowss">
              <i
                class="fa-regular fa-envelope"
                style={{ fontSize: "20px" }}
              ></i>
              &nbsp;:&nbsp;&nbsp; Lorem ipsum dolor sit amet
            </span>

            <span className="rowss">
              <i
                class="fa-sharp fa-solid fa-link"
                style={{ fontSize: "20px" }}
              ></i>
              &nbsp;:&nbsp;&nbsp; Lorem ipsum dolor sit amet
            </span>

            <span className="rowss">
              <i class="fa-brands fa-twitter" style={{ fontSize: "20px" }}></i>
              &nbsp;:&nbsp;&nbsp; Lorem ipsum dolor sit amet
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
              <Card title={tabs[selected].content}>
                {/* <p>Tab {selected} selected</p> */}
                <>
                  {selected === 0 && (
                    <>
                      <Page>
                        <span>
                        <Card>
                          <p className="sayhii">Hii, I'm Tiger Shroff</p>
                        </Card>
                        </span>
                      </Page>
                    </>
                  )}
                </>

                <>{selected === 1 && <>AAKASH2</>}</>

                <>{selected === 2 && <>AAKASH3</>}</>
              </Card>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
