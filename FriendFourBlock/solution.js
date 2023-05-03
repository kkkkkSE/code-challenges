function solution(m, n, board) {
    const removal = new Set();
    let answer = 0;
    let newBoard = Array(board[0].length).fill()
                   .map(v => Array(board.length).fill());

    const widthLen = board.length; // 90도 회전 후 width length

    // 2x2 체크 함수
    function checkTwoByTwo(x, y){
        const block = newBoard[x][y];
        if(!block) return false;
        
        if(
            block === newBoard[x+1][y] &&
            block === newBoard[x][y+1] &&
            block === newBoard[x+1][y+1]
        ) return true;
        return false;
    }

    // board 오른쪽으로 90도 회전
    for(let j = 0; j < board[0].length; j++){
        for(let i = board.length - 1, k = 0; i >= 0; i--, k++){
            newBoard[j][k] = board[i][j];
        }
    }

    while(true){
        removal.clear();

        // 2x2 블럭 찾기
        for(let i = 0; i < newBoard.length - 1; i++){
            for(let j = 0; j < newBoard[0].length - 1; j++){
                if(checkTwoByTwo(i, j)){
                    removal.add(JSON.stringify([i, j]));
                    removal.add(JSON.stringify([i+1, j]));
                    removal.add(JSON.stringify([i, j+1]));
                    removal.add(JSON.stringify([i+1, j+1]));
                }
            }
        }

        if(removal.size === 0) break;

        // 2x2 블럭 숫자 0으로 변환(블록 제거)
        for(let pos of removal){
            const [y, x] = JSON.parse(pos);
            newBoard[y][x] = 0;
        }
        answer += removal.size;

        // 제거된 블럭 아래로 땡기기(회전했으니 왼쪽으로 땡기기)
        newBoard = newBoard.map(row => {
            const newRow = row.filter(v => v !== 0);
            for(;newRow.length < widthLen;) newRow.push(0);
            return newRow;
        })
    }

    return answer;
}

solution(4, 5, ["CCBDE", "AAADE", "AAABF", "CCBBF"]) // 14
solution(6, 6, ["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"]) // 15

// [풀이 1]
// 1) board를 순회하면서 주변 2x2 블럭이 모두 같은 블럭인지 확인
//    * 제일 오른쪽, 제일 아래줄은 순회할 필요 없음
// 2) 2x2 블럭을 찾으면, 배열에 각 블럭의 위치를 기록해둠
// 3) board 순회가 끝나면 기록한 위치의 블럭 자리에 0을 넣어두고, 블럭 개수를 체크해둠.
// 4) 다시 board를 순회하는데, 이번엔 확인중인 블럭의 아래 위치에 0 인지 확인함.
// 5-1) 만약 아래 자리가 0이라면 자기자신과 자리 바꾸고 continue(2x2 확인 건너띔)
// 5-2) 아래 자리가 0이 아닐때만 2x2 블럭 확인 후 위치 기록
// 3번부터 다시 반복
// 한계 : 아래로 내려가야할 요소가 세로로 겹쳐있을 경우 아래 요소 하나만 끌어내려짐.
//[ 0, 0, 0, 'D', 'E' ],
//[ 0, 0, 0, 0, 'E' ],
//[ 0, 0, 0, 'D', 'F' ],
//[ 0, 0, 0, 0, 'F' ]
//
//[ 0, 0, 0, 'D', 'E' ],
//[ 0, 0, 0, 0, 'E' ],
//[ 0, 0, 0, 'D', 'F' ],
//[ 0, 0, 0, 0, 'F' ]

// [풀이 2]
// step1 : 2x2 블록 찾기 => 2x2 블록이 겹칠 수 있으므로 제거는 나중에
// step2 : 2x2 블록 제거 (숫자 0으로 변경)
// step3 : 아랫줄부터 올라가면서, 문자 대신 숫자가 있으면 숫자가 없는 곳까지 찾아 올라가서 값을 스위칭
//         찾아 올라갔는데 0뿐이면 해당 열은 체크하지 않아도 됨.
// 한계 : 너무 많은 순회,, 복잡해지는듯

// [풀이 3]
// 1) board를 우로 90도 회전
// 2) 2x2 블록 찾기 => 2x2 블록이 겹칠 수 있으므로 제거는 나중에
//    * 제일 오른쪽, 제일 아래줄은 체크할 필요 없음
// 3) 2x2 블록 제거 (숫자 0으로 변경)
// 4) filter를 이용해 0을 제거하면 자동으로 블럭이 아래로(90도 회전한 배열에서는 왼쪽으로) 내려오게 됨
//    filter 이후 나머지 칸 0으로 채워줌
// 2~4 반복, 제거해야할 블록이 없으면 반복 끝