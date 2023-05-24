function solution(rows, columns, queries) {
    const matrix = new Array(rows).fill().map((_, rowIdx) => {
        return new Array(columns).fill().map((_, colIdx) => rowIdx * columns + colIdx + 1)
    })
    let answer = [];

    for(let i = 0; i < queries.length; i++){
        const [rowMin, colMin, rowMax, colMax] = queries[i].map(v => v-1);
        let row = rowMin, col = colMin;
        let prev = matrix[row + 1][col];
        let min = Infinity;

        do {
            const cur = matrix[row][col];

            matrix[row][col] = prev;
            min = Math.min(min, prev);
            prev = cur;

            if(col >= colMax) {
                if(row < rowMax) row++;
                else col--;
            } else if(col <= colMin){
                if(row > rowMin) row--;
                else col++;
            } else {
                if(row <= rowMin) col++;
                else col--;
            }

        } while(!(col === colMin && row === rowMin))

        answer.push(min);
    }

    return answer;
}

// 1. 이중배열로 행렬을 만들어 숫자를 차례대로 채운다.
// 2. query 좌표를 차례로 받고(for문), 각 좌표에 대해 -1 (index로 바꾸기)
// 3. x축 범위와 y축 범위를 체크하여 차례대로 돌면서 prev 저장 / 할당
//    -> 가장 왼쪽 위 좌표부터 시작하여 x축 + 1 -> y축 + 1 -> x축 - 1 -> y축 - 1
//    -> 원점으로 돌아오면 루프 끝
//    -> 맨 처음 들어왔을 때 prev = 원점 바로 아래(y - 1)
//    -> prev가 추출될때마다 매번 최소 값인지 체크하여 따로 저장
// 4. 3번이 끝나면 최소값 answer 배열에 저장

// 1,1 1,2 1,3
// 2,1     2,3
// 3,1     3,3
// 4,1 4,2 4,3