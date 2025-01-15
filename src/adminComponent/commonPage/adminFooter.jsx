import { Link } from "react-router-dom";

const AdminFooter = () => {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid d-flex justify-content-between">
          <nav className="pull-left">
            <ul className="nav">
              
              <li className="nav-item">
                {/* Use Link for internal routing */}
                <Link className="nav-link" to="/contact">
                  Help
                </Link>
              </li>
             
            </ul>
          </nav>
          <div className="copyright">
            2024, made with <i className="fa fa-heart heart text-danger"></i> by
            <Link to="https://www.Jasnathfinance.in">Jasnath finance </Link>
          </div>
          <div>
            Distributed by
            <Link target="_blank" to="https://www.Jasnathfinance.in">
            Jasnath finance 
            </Link>
            .
          </div>
        </div>
      </footer>
    </>
  );
};

export default AdminFooter;
