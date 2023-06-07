function solution(weights) {
    const obj = {};
    let answer = 0;

    for(let i = 0; i < weights.length; i++){
        obj[weights[i]] = (obj[weights[i]] || 0) + 1;
    }

    for(let weight in obj){
        const cur = obj[weight];
        const w1 = weight * 2;
        const w2 = weight * 4 / 3;
        const w3 = weight * 3 / 2;

        answer += ((cur-1) * cur / 2) // 1:1
                  + ((obj[w1] || 0) * cur) // 4:2
                  + (Number.isInteger(w2) ? (obj[w2] || 0) * cur : 0) // 4:3
                  + (Number.isInteger(w3) ? (obj[w3] || 0) * cur : 0); // 3:2
    }

    return answer;
}

// [질문하기] 에서 얻은 힌트 :
// 몸무게의 가짓 수는 901가지, weights의 길이는 최대 10만 이므로 겹치는 무게가 많음.
// A 몸무게와 B 몸무게가 짝꿍이 성립된다는 걸 알게되면
// A 몸무게를 가진 n명과 B 몸무게를 가진 m명이 짝을 이루는 경우의 수 -> n * m 이 된다.
// 이를 이용해서 문제를 풀어보자.

// 1. weights를 순회하여 같은 몸무게를 가진 사람이 몇 명인지 체크할 수 있게 객체에 저장한다.
// 2. 객체를 순회하여 current 몸무게가 짝을 이룰 수 있는 몸무게를 계산한다.
//    4:2, 4:3, 3:2 비율로 총 3가지 경우가 고려함. 단, 정수여야 함.
//    2:4, 3:4, 2:3 을 고려하지 않는 이유는 짝이 될 몸무게도 current가 되어 동일한 과정을 거치기 때문.
// 3. 1:1 비율로 시소를 탈 수 있는 자신과 같은 몸무게와 짝이될 경우의 수 (1~n-1의 합) -> answer에 더함
// 4. 2번의 세가지 비율로 짝이 될 경우의 수를 각각 찾아 계산 -> answer에 더함
// 5. answer 반환


//// 시간초과

// weights에 있는 모든 짝 지을 수 있는 경우의 수를 생각해본다.
// 짝 지었을 때 순서는 상관 없다.

// 짝으로 정해질 수 있는 경우의 수
// 1:1
// 4:2 = 2:4
// 4:3 = 3:4
// 3:2 = 2:3

// function solution(weights) {
//     let answer = 0;
    
//     for(let i = 0; i < weights.length; i++){
//         for(let j = i+1; j < weights.length; j++){
//             const min = Math.min(weights[i], weights[j]);
//             const max = Math.max(weights[i], weights[j]);

//             if(
//                 (min === max)
//                 || (2*max === 4*min)
//                 || (3*max === 4*min)
//                 || (2*max === 3*min)
//             ) answer++;

//         }
//     }
    
//     return answer;
// }