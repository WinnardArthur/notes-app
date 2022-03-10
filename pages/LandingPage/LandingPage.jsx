import './landingPage.css';

const LandingPage = () => {
  return <div className="main">
      <div className="container">
          <div>
              <div className="intro-text">
                  <div>
                      <h1 className="title">Welcome to Notes App</h1>
                      <p className="subtitle">The Safest place to keep and retrieve all your notes.</p>
                  </div>
                  <div className="buttonContainer">
                      <a href="/login">
                          <button className="landingButton">Login</button>
                      </a>
                      <a href="/register" >
                          <button className="landingButton">Signup</button>
                      </a>
                  </div>
              </div>
          </div>
      </div>

  </div>
};

export default LandingPage;
