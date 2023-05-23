function solution(maps) {
    const width = maps[0].length, height = maps.length;
    const answer = [];

    maps = maps.map(v => [...v]);

    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            if(maps[i][j] === 'X') continue;

            let sum = 0;

            function questMap(a, b){
                if( 
                    a < 0 || a >= height || b < 0 || b >= width
                    || maps[a][b] === 'X'
                ) return;
                
                sum += +maps[a][b];
                maps[a][b] = 'X';

                questMap(a+1, b);
                questMap(a-1, b);
                questMap(a, b+1);
                questMap(a, b-1);
            }
            questMap(i, j);

            answer.push(sum);
        }
    }
    return answer.length ? answer.sort((a,b) => a-b) : [-1];
}

// maps의 문자열을 모두 배열로 바꾸고 시작하자.
// 1. maps의 배열원소를 순회하면서 X가 아닌 값을 찾는다.
// 2. X가 아닌 값을 만나면 새로운 변수(식량을 더할)와 함께 DFS룰 시작한다
// 3. DFS - 방문한 자리는 모두 식량으로 더한 뒤 X로 변경한다. 방문한 자리의 상,하,좌,우를 체크해 방문한다.
// 4. DFS가 끝나면 answer배열에 추가한다.
// 5. 다음 X가 아닌 값을 찾아 2번부터 반복한다.
// 6. 모든 반복문이 끝나면 answer를 반환한다. answer가 비었다면 return [-1] 