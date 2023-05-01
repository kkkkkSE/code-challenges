function solution(maps){
    const visited = maps.map(v => v.map(v => v ? false : true));
    const moveArr = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const n = maps[0].length, m = maps.length;

    let distance = 0;
    let currentVisits = []; // 현재 방문해야 할 좌표
    let upcomingVisits = []; // 다음 방문할 곳 => 아직 방문하지 않은 방문 가능한 좌표

    // 첫 칸으로 이동
    currentVisits.push([0, 0]);
    visited[0][0] = true;
    distance++;

    // currentVisits의 각 좌표 기준 4방향 모두 체크
    // (방문할 수 있는 곳 && 아직 방문하지 않은 곳)을 upcomingVisits에 저장
    // 방문할 수 있는 좌표가 없거나, 목적지 도착 시 반복문 끝남
    while(currentVisits.length){
        for(let j = 0; j < currentVisits.length; j++){
            const [y, x] = currentVisits[j];

            for(let i = 0; i < 4; i++){
                const moveX = x + moveArr[i][1], moveY = y + moveArr[i][0];

                // 유효하지 않은 좌표는 패스
                if(moveX < 0 || moveY < 0 || moveX >= n || moveY >= m) continue;

                // 목적지 도착 시 마무리 (가장 빨리 도착한 길 = 최단거리)
                if(moveX === n - 1 && moveY === m - 1) {
                    return distance + 1;
                }

                // 현재 좌표에서 4방향 중 아직 방문하지 않은 곳을 다음 방문할 좌표로 추가
                if(!visited[moveY][moveX]) {
                    upcomingVisits.push([moveY, moveX]);
                    visited[moveY][moveX] = true;
                }
            }
        }
        currentVisits = upcomingVisits;
        upcomingVisits = [];
        distance++;
    }

    // 목적지에 도달하지 못하고 반복문이 끝나면 길 없음
    return -1;
}

solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]]) // 11
solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]]) // -1
solution([[1, 1, 1, 1, 1]]) // 5