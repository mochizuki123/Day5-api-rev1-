
// リクエストデータ
const requestData = {
  location: {
    latitude: 35.67008137770319,
    longitude: 139.7028681539622,
  },
};

// APIエンドポイント
const endpoint = "https://airquality.googleapis.com/v1/currentConditions:lookup?key=AIzaSyDB0sIfh4kQJo82y4Y88wk0dt5ubXb4FdM";
//予測エンドポイントを使用して 1 時間ごとの大気質予測情報をリクエスト
const endpoint1 = "https://airquality.googleapis.com/v1/forecast:lookup?key=AIzaSyDB0sIfh4kQJo82y4Y88wk0dt5ubXb4FdM";

//fetch() 関数を使って指定したエンドポイント（endpoint）にリクエストを送信
async function fetchAirQuality() {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
        //console.log ("post-json", response);

    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API Response:", data);
    return data; // 関数の外にdata を持ち出せるようにする
  } catch (error) {
    console.error("Error fetching air quality data:", error);
  }
}


$(document).ready(function () { //JavaScript コードが HTML の DOM 要素が準備される前に実行されていると、#aa を見つけられないため追加
$("#aa").on("click", function() {
  fetchAirQuality().then((data) => {
  if (data) {
    const rawDateTime = data.dateTime;
    const date = new Date(rawDateTime);
    const formatteDate = new Intl.DateTimeFormat('ja-JP',{
      year: "numeric",
      month: "long",
      day: "numeric",

    }).format(date); //"2024年12月6日"
    console.log("確認2", date);

    const html = `
      <div class="ball">
        <p>〇 📅:  ${formatteDate}</p>
        <p>〇 大気の状態: ${data.indexes[0].category}
         今日もいい天気！！</p>
        
      </div>
    `;
    console.log(html,"確認3");
  // jQueryで画面に埋め込む処理🤗
    $("#output").append(html);
  
  } else {
    console.error("データ取得に失敗");
  }
});
});
});




//function fetchAirQuality() {
  //  const outputElement = $("#output");

/*
  $.ajax({
    url: endpoint,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(requestData),
    success: function (data) {
        
      // データ取得成功時の処理
      outputElement.html(`
        <p><strong>Location:</strong> (${requestData.location.latitude}, ${requestData.location.longitude})</p>
        <p><strong>Air Quality Data:</strong></p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `);
    },
    error: function (xhr, status, error) {
      // エラー時の処理
      outputElement.html(`<p style="color: red;">Error: ${xhr.status} ${xhr.statusText}</p>`);
    },
  });
}


const res =  fetch(endpoint);
console.log(res);

const air =  res.json();
const html = `
    <div>
        <p>大気：${air.id}</p>
    </div>
`;

  // jQueryで画面に埋め込む処理🤗
  $(".list").append(html);

  

/*function createPokemon(map) {
  // htmlと塊を組み合わせるテンプレートリテラルというものを使ってがっちゃんこします🤗
 }
  */