function solution(x, y, n) {
    let set = new Set([x]);
    let answer = 0;
    
    if(x === y) return 0;

    while(set.size > 0){
        const arr = [];
        answer++;

        for(let i of set){
            for(let el of [i * 3, i * 2, i + n]){
                if(el === y) return answer;
                if(el > y) continue;
                arr.push(el);
            }
        }
        set = new Set(arr);
    }
    return -1;
}

// *2, *3, +n 연산 결과를 모두 Set에 저장하고 순회하면서 세가지 연산을 반복한다.
// 3가지 연산을 반복한 횟수가 곧 answer이며,
// 중간 연산 결과에 중복이 있을 경우, 하나만 남긴다. -> Set 사용
// 모든 연산 결과가 y를 초과할 경우 Set에 아무것도 저장되지 않고 반복문이 끝나 -1 반환

// 큰 문제를 작은 문제로 나눠서 계산하고, 
// 중복된 작은 문제의 결과를 메모이제이션 하여 중복 계산을 피해야 한다. -> DP 문제


//// 테스트 케이스 절반 런타임 에러
// function solution(x, y, n) {
//     let answer = Infinity;

//     function helper(a, count = 0){
//         if(a === y) {
//             answer = Math.min(answer, count);
//             return;
//         }

//         if(a < y){
//             helper(a * 2, count + 1);
//             helper(a * 3, count + 1);
//             helper(a + n, count + 1);
//         }
//     }

//     helper(x);

//     return answer === Infinity ? -1 : answer;
// }