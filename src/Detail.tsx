import { Link, useParams } from "react-router-dom";
import "./App.scss";

const Detail: React.FunctionComponent = () => {
  const { id } = useParams();
  const ls = localStorage.getItem("oshiList") || "[]";
  const pageData = JSON.parse(ls).find((item: any) => item.id === Number(id));

  return (
    <div className="App">
      <h1>Oshi Detail</h1>
      <div className="detail-grid">
        <img src={pageData.imageUrl} alt={pageData.name} />
        <div className="name">{pageData.name}</div>
        <p>{pageData.description}</p>
      </div>

      <Link to="/" className="toTop">
        <p>To Top Page</p>
      </Link>
    </div>
  );
};

export default Detail;
