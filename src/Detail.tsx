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
        {/* 詳細では画像がフルサイズで表示されるようにして、一覧では頭から200pxの正方形カットした部分だけ表示、みたいにしたい */}
        <img src={pageData.imageUrl} alt={pageData.name} />
        <div className="name">{pageData.name}</div>
        <div className="name_en">{pageData.name_en}</div>
        <p>{pageData.description}</p>
      </div>
      {pageData.externalLink.length > 0 && (
        <div className="externalLink">
          {pageData.externalLink.map((item: string, i: number) => {
            return (
              <a target="_blank" href={item} key={i}>
                外部リンク{i + 1}
              </a>
            );
          })}
        </div>
      )}

      <Link to="/" className="toTop">
        <button>一覧に戻る</button>
      </Link>
    </div>
  );
};

export default Detail;
