import "./App.css";
import { useFetchData } from "./useFetchData";

function App() {
  const { loading, data, error } = useFetchData<RandomUser>(
    "https://randomuser.me/api/?nat=AU&results=20"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There was an error</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Date of Birth</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((randomUser) => {
            const randomUserDOB = new Date(randomUser.dob.date);
            return (
              <tr key={randomUser.login.uuid}>
                <td>
                  <img
                    className="avatar"
                    src={randomUser.picture.thumbnail}
                    alt={`Profile image for ${randomUser.name.first} ${randomUser.name.last}`}
                    width="50"
                    height="50"
                  />
                </td>
                <td>{`${randomUser.name.first} ${randomUser.name.last}`}</td>
                <td>
                  <a href={`mailto:${randomUser.email}`}>{randomUser.email}</a>
                </td>
                <td>
                  <a href={`tel:${randomUser.phone}`}>{randomUser.phone}</a>
                </td>
                <td>{`${randomUserDOB.getDay().toString()}/${randomUserDOB
                  .getMonth()
                  .toString()}/${randomUserDOB.getFullYear().toString()}`}</td>
                <td>{`${randomUser.location.street.number} ${randomUser.location.street.name}, ${randomUser.location.city}, ${randomUser.location.state}, ${randomUser.location.country}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
