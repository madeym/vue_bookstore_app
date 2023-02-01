export default function GetUserData() {
    const UserData = (localStorage.getItem('UserData')) ? localStorage.getItem('UserData') : {};
    console.log(UserData);
    return UserData;
};