function solution(n) {
    const numOfCases = [0] // [3, 12, 39, ...] 자리수에 대한 경우의 수
    let i = 1; // 자리수
    let sum = 3;

    while(sum < n){
        numOfCases.push(sum);
        sum += 3 ** ++i;
    }

    const answer = new Array(i+1).fill(null);

    // 앞자리부터 찾음
    for(i -= 1; i >= 0; i--){        
        // 이미 앞에서 구한 자리수는 빼고 계산
        // ex ) 2111 에서 2를 구했으면, 2를 빼고 111으로만 계산하기 위함
        const minus = answer.reduce((a, c, i) => {
            return !c ? a : a + (c * (3 ** i));
        }, 0);
        const num = n - numOfCases[i] - minus;

        answer[i] = Math.ceil(num / (3 ** i));
    }

    return answer.reverse().map(v => {
        return v === 3 ? 4 : v
    }).join("").toString();
}

// 124 나라의 숫자 한자리 수 -> 3 이하, 두자리 수 -> 3 이상 9 이하, 세자리 수 -> 9 이상 27 이하
// n자리 수 -> 3^(n-1)이상 3^n 이하

// 2111 => 2 * 3^3 + 1 * 3^2 + 1 * 3^1 + 1 * 3^0 => 67
// 24212 => 2 * 3^4 + 3 * 3^3 + 2 * 3^2 + 1 * 3^1 + 2 * 3^0 => 266
//             162      27       18         3          2
