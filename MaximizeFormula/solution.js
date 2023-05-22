function calc(s, n1, n2) {
    switch(s){
        case '+':
            return +n1 + +n2;
        case '-':
            return +n1 - +n2;
        case '*':
            return +n1 * +n2;
    }
}

function solution(expression) {
    const split = expression.split(/(\+|\*|-)/);
    const n = split.filter((v) => !isNaN(v));
    const s = split.filter((v) => isNaN(v));
    let answer = 0;

    // 연산 우선순위의 모든 경우의 수를 찾기 위한 완전 탐색
    const set = [...new Set(s)];
    const visited = new Array(set.length).fill(false);
    const priority = [];
    
    function checkPriority (str, visited){
        if(str.length >= set.length){
            priority.push(str);
            return;
        }

        for(let i=0; i<set.length; i++){
            if(!visited[i]){
                visited[i] = true;
                checkPriority(str + set[i], visited);
                visited[i] = false;                
            }
        }
    }
    checkPriority('', visited);

    // priority 형태 예시 : [ '-*+', '-+*', '*-+', '*+-', '+-*', '+*-' ]

    // 연산 시작
    for(let i = 0; i < priority.length; i++){
        const copyN = [...n];
        const copyS = [...s];

        for(let j = 0; j < priority[i].length; j++){
            const symbol = priority[i][j];

            while(copyS.indexOf(symbol) > -1){
                const pos = copyS.indexOf(symbol);
                
                const result = calc(symbol, copyN[pos], copyN[pos+1]);

                copyN.splice(pos, 2, result);
                copyS.splice(pos, 1);
            }
        }
        
        answer = Math.max(answer, Math.abs(copyN[0]));
    }
}

// 수식의 우선순위를 모든 경우의 수로 매기고, 그에 맞게 연산하기.
// 사전준비. 연산할 수 있도록 expression의 숫자, 기호를 나눠 각각 배열에 담는다.
// 1. 수식 우선순위 나올 수 있는 모든 경우를 배열에 담는다.
// 2. 모든 경우의 수에 접근할 수 있도록 for문을 돌린다. 
// 3. 2번의 for문 안에서 각 연산기호에 대해 for문을 돌린다.
// 4. 사전준비때 만들어놓은 기호 배열에서 연산 기호의 위치를 찾고, 기호위치가 n 이면 숫자[n] 기호 숫자[n+1]
// 5. 해당 연산 기호를 모두 연산할 수 있게 while ( 기호 위치 -1 아닐때까지 )
// 6. 연산 후 숫자배열[n],[n+1] 기호배열[n]은 잘라내고 숫자배열 잘라낸 자리에 연산결과를 넣는다.
// 7. 모든 연산이 끝나면 기존 answer와 비교하여 더 크면 덮어쓰기. 절대값 씌우는 거 잊지 말기.

// tip : 연산기호가 원래 3개 뿐이라 그냥 경우의 수 만들고 시작해도 됐었음.. ^^