function solution(picks, minerals) {
  const tools = ['dia', 'iron', 'stone'];
  const fatigue = [
    {diamond : 1, iron: 1, stone: 1},
    {diamond : 5, iron: 1, stone: 1},
    {diamond : 25, iron: 5, stone: 1},
  ]
  const max = Math.min((picks.reduce((a,c)=>a+c) * 5), minerals.length); // 캘 수 있는 횟수
  const weightArr = new Array(Math.ceil(max / 5)).fill().map(_ => [0, 0, 0]);
  let answer = 0;

  // minerals를 5개씩으로 쪼개 장비별 5광석 캐고 쌓인 피로도 저장
  for(let i = 0; i < max; i++){
    weightArr[Math.floor(i / 5)][0] += fatigue[0][minerals[i]];
    weightArr[Math.floor(i / 5)][1] += fatigue[1][minerals[i]];
    weightArr[Math.floor(i / 5)][2] += fatigue[2][minerals[i]];
  }

  // 돌 곡괭이 기준 피로도 내림차순
  weightArr.sort((a, b) => b[2] - a[2]);

  // 피로도 내림차순 된 배열에서 좋은 장비 순서로 광석 캐기
  for(let i = 0; i < weightArr.length; i++){
    const toolIdx = picks.findIndex(v => v !== 0);
    picks[toolIdx] -= 1;

    answer += weightArr[i][toolIdx];
  }

  return answer;
}



//// 가중치는 곡괭이마다 다른 비율로 적용되므로 실제 피로도 비용으로 비교하는 걸로 변경

// 곡괭이의 종류 : 다이아몬드, 철, 돌
// 각 곡괭이는 0개~5개를 가지고 있음
// 각 곡괭이는 하나당 5번씩 사용 가능
// 캐는 광물에 따라 닳는 피로도가 다름

// 곡괭이는 한번 사용을 시작하면 5번 다 쓸 때까지 바꿀 수 없음, 광물 순서 바꿀 수 없음 => 큐
// 곡괭이가 없거나 캘 광물이 없을 때까지 캠.

// 1. 광석을 5개씩 끊어 구간마다 가중도가 얼마나 되는지 계산한다.(다이아3, 철2, 돌1)
// 2. 가중도 내림차순으로 미네랄을 재배열하고, 
//    곡괭이를 다이아 -> 철 -> 돌 순으로 사용하며 광석을 캔다. 캘 때 answer + 피로도
// 3. 광석을 캐는 것은 곡괭이가 다 닳으면 그만둔다.