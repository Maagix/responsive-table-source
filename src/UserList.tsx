// UserList.tsx
import { useState, useEffect } from "react";
import Loader from "./Loader";
import ErrorScreen from "./ErrorScreen";

// Define the interface for the user object
interface Address {
  city: string;
  geo: { lat: string; lng: string };
  street: string;
  suite: string;
  zipcode: string;
}

interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

interface User {
  // TO DO: Define the properties of the user object
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

function UserList() {
  // TO DO: Define any other interfaces required to access all properties of the user object

  const API_URL = "https://jsonplaceholder.typicode.com/users";

  // To test error
  // const API_URL = "https://jsonplaceholder.typicode.com/user";

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Function for fetching users from the API
  const fetchUsers = async () => {
    // TO DO: Fetch users from the API, handle loading and error states
    try {
      // Delay to see loading screen
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();

      setUsers(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Call fetchUsers when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handled by handleOnChange
  // const handleSelectUser = (user: User) => {};

  function handleOnChange(id: number) {
    const user = users.find((user) => user.id === id) || null;
    setSelectedUser(user);
  }

  if (isLoading) return <Loader />;

  if (error) return <ErrorScreen err={error} />;

  // Render the component
  return (
    <div className="box">
      <div className="user-select">
        <label htmlFor="users" className="user-select-label">
          Select a user
        </label>
        <select
          name="users"
          className="users-select"
          value={selectedUser?.id}
          onChange={(e) => handleOnChange(Number(e.target.value))}
          defaultValue={undefined}
        >
          <option value={undefined}>All</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <table className="table">
        <thead className="table-head">
          {/* TO DO: display simple view with the following: ui for isLoading, errors (if any) & table for displaying users, with a select field for managing user selection*/}
          {/* *
                <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>City</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Company Name</th>
                </tr>
                </thead>
                */}

          <tr className="table-head-row">
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company Name</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {/* Render selected or all users */}
          {selectedUser ? (
            <tr className="table-body-row">
              <td>
                <span className="cell-header">ID:</span>
                {selectedUser.id}
              </td>
              <td>
                <span className="cell-header">Name:</span> {selectedUser.name}
              </td>
              <td>
                <span className="cell-header">Username</span>{" "}
                {selectedUser.username}
              </td>
              <td>
                <span className="cell-header">Email:</span> {selectedUser.email}
              </td>
              <td>
                <span className="cell-header">City:</span>{" "}
                {selectedUser.address.city}
              </td>
              <td>
                <span className="cell-header">Phone:</span> {selectedUser.phone}
              </td>
              <td>
                <span className="cell-header">Website:</span>{" "}
                {selectedUser.website}
              </td>
              <td>
                <span className="cell-header">Company:</span>{" "}
                {selectedUser.company.name}
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="table-body-row">
                <td>
                  <span className="cell-header">ID:</span> {user.id}
                </td>
                <td>
                  <span className="cell-header">Name:</span> {user.name}
                </td>
                <td>
                  <span className="cell-header">Username</span> {user.username}
                </td>
                <td>
                  <span className="cell-header">Email:</span> {user.email}
                </td>
                <td>
                  <span className="cell-header">City:</span> {user.address.city}
                </td>
                <td>
                  <span className="cell-header">Phone:</span> {user.phone}
                </td>
                <td>
                  <span className="cell-header">Website:</span> {user.website}
                </td>
                <td>
                  <span className="cell-header">Company:</span>{" "}
                  {user.company.name}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
