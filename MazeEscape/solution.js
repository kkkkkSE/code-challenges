function solution(maps) {
  const width = maps[0].length, height = maps.length;
  const move = [[0,1], [1,0], [0,-1], [-1,0]];
  let s, e, l;

  maps = maps.map(row => row.split(""));

  // 출발점, 레버, 도착점 좌표 탐색
  for(let i=0; i<height; i++){
    for(let j=0; j<width; j++){
      const el = maps[i][j];

      if (el === "S") {
        s = [i, j];
      } else if (el === "E") {
        e = [i, j];
      } else if (el === "L") {
        l = [i, j];
      }
    }
  }

  // 최단 거리 탐색
  function bfs(start, end, visit){
    let curVisit = [];
    let upcomingVisit = [];
    let distance = -1;

    curVisit.push(start);
    visit[start[0]][start[1]] = "X";

    while(curVisit.length){
      distance++;

      for(let i = 0; i < curVisit.length; i++){
        const [row, col] = curVisit[i];
        
        for(let j = 0; j < move.length; j++){
          const r = row + move[j][0], c = col + move[j][1];

          if(c >= 0 && c < width && r >= 0 && r < height && (visit[r][c] !== "X")) {
            if(r === end[0] && c === end[1]) return distance + 1;

            upcomingVisit.push([r, c]);
            visit[r][c] = "X";
          }
        }
      }
      curVisit = upcomingVisit;
      upcomingVisit = [];
    }

    return -1;
  }

  // 출발점 - 레버 최단거리
  const sToL = bfs(s, l, JSON.parse(JSON.stringify(maps)));

  if(sToL === -1) return -1;

  // 레버 - 도착점 최단거리
  const lToE = bfs(l, e, JSON.parse(JSON.stringify(maps)));

  if(lToE === -1) return -1;

  return sToL + lToE;
}

// 백트래킹 문제, 미로를 통과하기 위해선 레버를 당겨야 함
// 출발점 -> 레버, 레버->도착점 2번의 BFS가 있어야 할 듯.

// 1. 2번 사용될 BFS 함수 생성, visited 배열 생성("X" 인 곳은 true, 아닌 곳은 모두 false)
// 2. BFS는 최단거리를 찾을 때 적절한 방법으로, 시작점으로부터 갈 수 있는 모든 방향(좌, 우, 위, 아래)을 다 방문한다.
//    방문할 곳을 curVisit에 저장하며, curVisit에 있는 위치로부터 갈 수 있는 모든 경로를 upcomingVisit에 기록한다.(기록 시 방문처리)
//    다음 순회 시 curVisit = upcomingVisit 이 되고, upcomingVisit은 비워준다. 순회 한번마다 distance 1 증가
//    단, visited에 기록 확인 후 이미 방문했던 곳은 가지 않는다.(경로 단절)
// 3. 도착점에 도착했을 경우 바로 함수를 종료하며 도착점까지의 distance를 반환한다.
// 4. dfs 함수로 출발점 -> 레버 경로의 최단경로 찾기, -1일 시 이후 과정 필요없고 -1 반환
// 5. dfs 함수로 레버 -> 도착점 경로의 최단경로 찾기, -1일 시 최종 답으로 -1 반환
// 6. 출발점 -> 레버 -> 도착점 이동 수의 합 반환


// 이슈

// - visited 배열의 깊은 복사가 이뤄지지 않아 두번의 dfs 함수에서 같은 visited 배열 사용. 깊은 복사 후 진행
// - 시간초과 이슈로 visited 배열을 따로 만들지 않고 maps를 활용함. "X"인 경우 방문하지 않고, 아닌 경우는 방문 가능. 방문한 곳은 모두 "X"로 변경
// - 그래도 시간초과 이슈 발생 -> 도착점인지 확인하는 if문의 위치를 변경
//   기존 : curVisit의 요소 방문 후 도착점인지 확인
//   변경 : upcomingVisit에 담기 직전에 도착점인지 확인