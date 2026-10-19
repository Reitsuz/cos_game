const questions = [
  { q:"遼さんのXアカウントのユーザー名は？", a:["@sobaabura_","@ryo_archive","@haruka_cosplay","@sobaabura"], correct:0, note:"アカウント名を確認。記録へのアクセスが進みました。" },
  { q:"遼さんがコスプレ活動を開始したのは何年何月？", a:["2024年7月","2025年7月","2025年10月","2026年7月"], correct:1, note:"コスプレ活動開始時期を記録しました。" },
  { q:"遼さんが最近行った国・場所は？", a:["韓国・ソウル","台湾・台北","中国・重慶","タイ・バンコク"], correct:2, note:"最近訪れた場所の記録を照合しました。" },
  { q:"オープンチャットの管理人は誰？", a:["ぐーば","かまたま","テオ","パキスラ"], correct:3, note:"管理人の記録を照合しました。" },
  { q:"遼さんの今後の目標として選んだものは？", a:["配信者","女優","モデル","コスプレイヤー"], correct:3, note:"今後の目標を記録しました。" }
];
const records = [
  {title:"LUCY / NIGHT CITY", desc:"サイバーパンクの記録。元投稿を開いて確認。", url:"https://x.com/sobaabura_/status/2094005024171196487", link:"Xの投稿を開く ↗"},
  {title:"RIRUKA / BLEACH", desc:"BLEACH・毒ヶ峰リルカの記録。", url:"https://x.com/sobaabura_/status/2067194076617998773", link:"Xの投稿を開く ↗"},
  {title:"COSPLAY ARCHIVE", desc:"遼さんの投稿をXでチェック。", url:"https://x.com/sobaabura_", link:"Xプロフィールを開く ↗"},
  {title:"LOST FILE 004", desc:"投稿をたどって記録を探す。", url:"https://x.com/sobaabura_", link:"Xプロフィールを開く ↗"},
  {title:"LOST FILE 005", desc:"新しい記録はXの投稿から確認。", url:"https://x.com/sobaabura_", link:"Xプロフィールを開く ↗"},
  {title:"FINAL TRACE", desc:"アーカイブの最後の手がかり。", url:"https://x.com/sobaabura_", link:"Xプロフィールを開く ↗"}
];
let current=0, score=0, answered=false, unlocked=0, soundOn=false;
const $=id=>document.getElementById(id);
const answers=$("answers");
function start(){ $("statusText").textContent="INVESTIGATING"; $("quiz").scrollIntoView({behavior:"smooth",block:"start"}); renderQuestion(); scareChance(.08); }
function renderQuestion(){
  answered=false; const item=questions[current];
  $("quizCount").textContent=`QUESTION ${String(current+1).padStart(2,"0")} / ${String(questions.length).padStart(2,"0")}`;
  $("quizScore").textContent=`SCORE ${score}`; $("questionText").textContent=item.q;
  $("progressFill").style.width=`${current/questions.length*100}%`;
  $("quizFeedback").textContent="回答を選択してください。"; $("nextQuestion").disabled=true;
  $("nextQuestion").textContent=current===questions.length-1?"結果を確認 →":"次の質問 →";
  answers.innerHTML="";
  item.a.forEach((answer,i)=>{const b=document.createElement("button");b.className="answer";b.textContent=String.fromCharCode(65+i)+"  /  "+answer;b.onclick=()=>choose(i,b);answers.appendChild(b);});
}
function choose(i,button){
  if(answered)return; answered=true; const item=questions[current];
  [...answers.children].forEach((b,j)=>{b.disabled=true;if(j===item.correct)b.classList.add("correct");});
  if(i===item.correct){score++;button.classList.add("correct");$("quizFeedback").textContent="ACCESS GRANTED // "+item.note;unlockNext();}
  else {button.classList.add("wrong");$("quizFeedback").textContent="ACCESS DENIED // "+item.note;scareChance(.34);}
  $("quizScore").textContent=`SCORE ${score}`;$("progressFill").style.width=`${(current+1)/questions.length*100}%`;
  $("nextQuestion").disabled=false;
}
function unlockNext(){
  if(unlocked<records.length){const index=unlocked;unlocked++;const card=document.querySelector(`.record[data-id="${index}"]`);const data=records[index];card.classList.remove("locked");card.classList.add("unlocked");
    card.querySelector(".record-art span").textContent=String(index+1).padStart(2,"0");
    card.querySelector("h3").textContent=data.title;card.querySelector("p").textContent=data.desc;
    const a=card.querySelector("a");a.href=data.url;a.textContent=data.link;a.classList.remove("disabled");a.removeAttribute("aria-disabled");a.target="_blank";a.rel="noopener noreferrer";
    $("accessLevel").textContent=String(Math.min(unlocked+1,6)).padStart(2,"0");
  }
}
function next(){if(!answered)return;if(current<questions.length-1){current++;renderQuestion();scareChance(.13);}else{ $("questionText").textContent=`調査終了：${score} / ${questions.length} 問正解`;answers.innerHTML="";$("quizFeedback").textContent=score>=4?"アーカイブへの接続が安定しました。記録を確認してください。":"接続が不安定です。もう一度STARTから挑戦できます。";$("nextQuestion").textContent="もう一度調査する";$("nextQuestion").disabled=false;$("nextQuestion").onclick=restart;$("statusText").textContent=score>=4?"ACCESS GRANTED":"PARTIAL";}}
function restart(){current=0;score=0;answered=false;unlocked=0;records.forEach((_,i)=>{const c=document.querySelector(`.record[data-id="${i}"]`);c.classList.add("locked");c.classList.remove("unlocked");c.querySelector(".record-art span").textContent="?";c.querySelector("h3").textContent="UNKNOWN RECORD";c.querySelector("p").textContent="まだアクセスできません。";const a=c.querySelector("a");a.href="#";a.textContent="LOCKED — クイズを進める";a.classList.add("disabled");a.setAttribute("aria-disabled","true");a.removeAttribute("target");});$("accessLevel").textContent="01";$("statusText").textContent="WAITING";$("nextQuestion").onclick=next;renderQuestion();}
function scareChance(chance){if(Math.random()<chance)setTimeout(showHorror,450);}
function showHorror(){if(document.hidden)return;$("flash").classList.remove("bang");void $("flash").offsetWidth;$("flash").classList.add("bang");$("horrorMessage").textContent=["見ているよ。","後ろにいる。","記録は消えていない。","まだ帰らないで。"][Math.floor(Math.random()*4)];$("horrorOverlay").classList.add("active");$("horrorOverlay").setAttribute("aria-hidden","false");if(soundOn)beep();}
function closeHorror(){$("horrorOverlay").classList.remove("active");$("horrorOverlay").setAttribute("aria-hidden","true");}
function beep(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const c=new C(),o=c.createOscillator(),g=c.createGain();o.type="sawtooth";o.frequency.setValueAtTime(110,c.currentTime);o.frequency.exponentialRampToValueAtTime(45,c.currentTime+.45);g.gain.setValueAtTime(.13,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.5);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.5);}catch(e){}}
$("startBtn").addEventListener("click",start);$("nextQuestion").addEventListener("click",next);$("closeHorror").addEventListener("click",closeHorror);
$("checkBehind").addEventListener("click",()=>{ $("warningText").textContent="……信号を検出。確認しないほうがよかったかもしれません。";showHorror();});
$("soundBtn").addEventListener("click",()=>{soundOn=!soundOn;$("soundBtn").textContent=`効果音：${soundOn?"ON":"OFF"}`;$("soundBtn").setAttribute("aria-pressed",String(soundOn));if(soundOn)beep();});
renderQuestion();