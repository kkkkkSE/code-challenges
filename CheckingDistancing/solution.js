function solution(places) {
    const pos = [[0,1], [1,0], [0,-1], [-1,0]];

    return places.map(place => {
        for(let row = 0; row < 5; row++){
            for(let col = 0; col < 5; col++){
                const d0 = place[row][col];
    
                if(d0 === "P"){
                    for(let i = 0; i < pos.length; i++){
                        const d1row = row + pos[i][0], d1col = col+pos[i][1]

                        if(d1row < 0 || d1row > 4 || d1col < 0 || d1col > 4) continue;

                        const d1 = place[d1row][d1col];
    
                        if(d1 === "P") return 0;
                        if(d1 === "O") {
                            for(let j = 0; j < pos.length; j++){
                                if(j === (i + 2) % 4) continue; // 왔던 방향은 패스

                                const d2row = d1row + pos[j][0], d2col = d1col+pos[j][1]

                                if(d2row < 0 || d2row > 4 || d2col < 0 || d2col > 4) continue;

                                const d2 = place[d2row][d2col];

                                if(d2 === "P") return 0;
                            }
                        }
                    }
                }
            }
        }
        return 1;
    })
}

// 각 원소 탐색
// 원소가 P일 경우, 새로운 반복문 시작
// P의 위, 아래, 왼쪽, 오른쪽을 체크. -> 배열에 저장해놓고 편하게 쓰자
// -> 4방향 중 P가 나오면 거리두기 X -> 바로 0 반환
// -> X일 경우는 패스(X쪽으로 P의 대각선 방향에 사람이 있더라도 파티션 있어서 ㄱㅊ)
// -> O일 경우, P가 있는 방향을 제외한 나머지 3방향 체크
//    -> P가 있을 경우 거리두기 X -> 바로 0 반환
//    -> 나머지는 모두 통과

