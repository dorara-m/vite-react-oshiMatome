import { useCallback, useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // const data = [
  //   {
  //     id: 1,
  //     name: "推し1",
  //     imageUrl: "https://placehold.jp/150x150.png",
  //     description: "推し1の説明",
  //     externalLink: ["https://twitter.com/", "https://www.youtube.com/"],
  //   },
  //   {
  //     id: 2,
  //     name: "推し2",
  //     imageUrl: "https://placehold.jp/150x150.png",
  //     description: "推し2の説明",
  //     externalLink: ["https://twitter.com/", "https://www.youtube.com/"],
  //   },
  // ];
  // const dataType = {
  //   id: String,
  //   name: String,
  //   imageUrl: String,
  //   description: String,
  //   externalLink: String
  // }
  const [newOshi, setNewOshi] = useState({
    name: "",
    imageUrl: "",
    description: "",
    externalLink: [],
  } as any);
  const handleChange = (event: any) => {
    setNewOshi({
      ...newOshi,
      [event.target.name]: event.target.value,
    });
  };

  // ローカルストレージ系
  const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getLocalStorage = (key: string) => {
    const lsData = localStorage.getItem(key);
    return lsData ? JSON.parse(lsData) : null;
  };
  const [oshiList, setOshiList] = useState(getLocalStorage("oshiList") || []);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(newOshi);
    console.log(oshiList);
    // ⇣⇣動いてる？？
    setOshiList([...oshiList, newOshi]);
    // ここで確認しても、oshiListが更新されない、、
    console.log(oshiList);
    setLocalStorage("oshiList", oshiList);
    togglePopup();
  };
  // 外部リンクをコンマ区切りで配列にする処理かきたい

  return (
    <div className="App">
      <div className="wrap">
        <h1>OshiMatome</h1>
        <button onClick={togglePopup}>新規追加</button>
        <div className="list">
          <ul>
            {oshiList.map((item: any, i: number) => {
              return (
                <li key={i}>
                  <a href={`detail/${item.id}`}>
                    <div className="image">
                      <img src={item.imageUrl} alt={`${item.name}の画像`} />
                    </div>
                    <div className="name">{item.name}</div>
                    <div className="description">{item.description}</div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup_inner">
              <button onClick={togglePopup}>閉じる</button>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="名前"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="画像url"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <textarea
                  name="description"
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="推しへの愛を書けぇ！"
                  onChange={handleChange}
                  autoComplete="off"
                ></textarea>
                <textarea
                  name="externalLink"
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="外部リンクをコンマ区切りで（※未実装なので現状ただのテキストエリア）"
                  onChange={handleChange}
                  autoComplete="off"
                ></textarea>
                <input type="submit" value="追加" />
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
