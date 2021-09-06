import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../Redux/Actions/userActions";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.all[0]);
  console.log();
  useEffect(() => {
    dispatch(getUserInfo());
    // eslint-disable-next-line
  }, []);

  return data ? (
    <div className="ProfileSectionContainer">
      <div>{/* <img src={userInfo.avatar} alt="avatar" /> */}</div>
      <div className="userInfo">
        <p>Name: {data.name}</p>

        <p>
          You follow{" "}
          {data.labels?.length < 1 ? (
            <>no labels, add some by clicking the label button above</>
          ) : data.labels?.length === 1 ? (
            <> {data.labels?.length} label</>
          ) : data.labels?.length > 1 ? (
            <> {data.labels?.length} labels</>
          ) : (
            <></>
          )}
        </p>
        <p>
          You have
          {data.inLibrary?.length < 1 ? (
            <>
              no titles in your library, add some by clicking the search button
              above
            </>
          ) : data.inLibrary?.length === 1 ? (
            <> {data.inLibrary?.length} title</>
          ) : data.inLibrary?.length > 1 ? (
            <> {data.inLibrary?.length} titles in your library</>
          ) : (
            <></>
          )}
        </p>
      </div>
    </div>
  ) : (
    <>LOADING</>
  );
};

export default ProfileSection;
