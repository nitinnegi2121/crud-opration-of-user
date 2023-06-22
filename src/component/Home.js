import React, { useState, useEffect } from 'react';

const Home = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phone: '',
    isemailValid: false,
    isphoneValid: false,
  });
  const [userList, setUserList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const onChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;

    // Validate email
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    }

    // Validate phone number
    if (name === 'phone') {
      const phoneRegex = /^\+?\d{10}$/;
      isValid = phoneRegex.test(value);
    }

    setUserDetails({ ...userDetails, [name]: value, [`is${name}Valid`]: isValid });
  };

  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem('userList'));
    if (data && data.length) {
      setUserList(data);
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (editIndex === -1) {
      // Adding a new user
      let newUlist = [...userList];
      newUlist.push(userDetails);
      setUserList(newUlist);
      sessionStorage.setItem('userList', JSON.stringify(newUlist));
      setUserDetails({
        username: '',
        email: '',
        phone: '',
        isEmailValid: true,
        isPhoneValid: true,
      });
      alert('User Created Successfully');
    } else {
      // Updating an existing user
      let newUlist = [...userList];
      newUlist[editIndex] = userDetails;
      setUserList(newUlist);
      sessionStorage.setItem('userList', JSON.stringify(newUlist));
      setUserDetails({
        username: '',
        email: '',
        phone: '',
        isEmailValid: true,
        isPhoneValid: true,
      });
      setEditIndex(-1);
      alert('User Updated Successfully');
    }
  };

  const deleteUser = (index) => {
    let newUlist = [...userList];
    newUlist.splice(index, 1);
    setUserList(newUlist);
    sessionStorage.setItem('userList', JSON.stringify(newUlist));
    setEditIndex(-1);
  };

  const editUser = (index) => {
    const user = userList[index];
    setUserDetails({
      username: user.username,
      email: user.email,
      phone: user.phone,
      isEmailValid: true,
      isPhoneValid: true,
    });
    setEditIndex(index);
  };

  return (
    <div>
      <div className="main-form">
        <h3>{editIndex === -1 ? 'Add User' : 'Update User'}</h3>
        <form className="mf-inner">
          <div className="mfi-col">
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className={`form-control ${userDetails.username.length >= 3 ? '' : 'is-invalid'}`}
              id="username"
              name="username"
              onChange={onChange}
              minLength={5}
              required
              value={userDetails.username}
            />
          </div>
          <div className="mfi-col">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${userDetails.isemailValid ? '' : 'is-invalid'}`}
              id="email"
              name="email"
              onChange={onChange}
              required
              value={userDetails.email}
            />
            {!userDetails.isemailValid && (
              <div className="invalid-feedback">Please enter a valid email address.</div>
            )}
          </div>
          <div className="mfi-col">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className={`form-control ${userDetails.isphoneValid ? '' : 'is-invalid'}`}
              id="phone"
              name="phone"
              onChange={onChange}
              value={userDetails.phone}
              required
            />
            {!userDetails.isphoneValid && (
              <div className="invalid-feedback">Please enter a valid phone number</div>
            )}
          </div>
          <button
            disabled={userDetails.username.length < 3 || !userDetails.isemailValid || !userDetails.isphoneValid}
            type="submit"
            className={`btn btn-primary ${userDetails.username.length < 1 || !userDetails.isemailValid || !userDetails.isphoneValid ? "disabled" : ""}`}
            onClick={handleClick}
          >
            {editIndex === -1 ? 'Add User' : 'Update User'}
          </button>
        </form>
      </div>

      <div className="user-list">
        {userList.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <div className="">
                <h5 className="card-title">{item.username}</h5>
              </div>
              <p className="card-para">{item.email}</p>
              <p className="card-text">{item.phone}</p>
              <div className='btns'>
                <button type="button" onClick={() => editUser(index)}>
                  Edit
                </button>
                <button type="button" className='delete' onClick={() => deleteUser(index)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
