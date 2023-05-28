function solution(board){
    const width = board[0].length, height = board.length;
    const arr = new Array(height).fill().map((_, rowIdx) => {
        return new Array(width).fill().map((_, colIdx) => {
            return board[rowIdx][colIdx];
        })
    })
    let max = board[0][0];

    for(let row = 1; row < height; row++){
        for(let col = 1; col < width; col++){
            if(!board[row][col]) continue;

            arr[row][col] = Math.min(
                arr[row-1][col],
                arr[row][col-1],
                arr[row-1][col-1]
            ) + 1;

            max = Math.max(max, arr[row][col]);
        }
    }

    return max * max;
}

// 해설 참고 - DP 
// board와 동일한 이중 배열을 하나 만든다.
// board (1,1) 부터 순회를 돈다.
// -> 해당 요소가 1인지 체크. 1일 때만 다음 스텝 진행
// -> 새로만든 배열에서 해당 위치의 왼쪽 / 윗쪽 / 왼쪽 대각선 위 요소 중 가장 작은 숫자 찾기
// -> 가장 작은 숫자 + 1 이 현재 위치에서 만들 수 있는 정사각형의 크기임.
//    -> 가장 작은 숫자 + 1 을 max 변수와 비교하여 큰 값을 max에 저장
// return max * max 




//// 효율성 테스트 실패

// 찾아낸 정사각형의 한 변의 길이를 저장해 둘 변수 len 생성
// board 순회, 1일 때만 아래 루트 진행(if)
// 아래의 순서로 좌표를 변경하면서 1인지 계속 확인할 것
// n은 1부터 시작하여 3번 스텝에서 1씩 증가할 것
// 1. 현재 좌표(row,col)에서 (row+n, col), (row, col+n)로 이동
// 2. (row+n, col)는 col++, (row, col+n)는 row++ 하여 이동
// 3. 2번을 계속 반복하다가 두 좌표가 같은 좌표에서 만나면 n++ -> 1번으로 돌아간다.
// 0을 만나면 1~3 순회를 break하고, 당시의 n이 정사각형의 한 변의 길이가 된다.
// 기존에 저장된 len과 n을 비교하여 더 큰 쪽을 저장한다.
// 마지막으로 len ** 2(넓이) 반환

// function solution(board){
//     const width = board[0].length, height = board.length;
//     let len = 0;

//     for(let row = 0; row < height; row++){
//         for(let col = 0; col < width; col++){
//             if(board[row][col]){
//                 let r = row, c = col;
//                 let n = 1;

//                 while(row + n < height && col + n < width){
//                     let el1 = board[row + n][c];
//                     let el2 = board[r][col + n];
                    
//                     if(!el1 || !el2) break;

//                     if(row + n === r && col + n === c) {
//                         r = row, c = col;
//                         n++;
//                     }else{
//                         r++, c++;
//                     }
//                 }
//                 len = Math.max(len, n);
//             }
//         }
//     }
//     return len * len;
// }

