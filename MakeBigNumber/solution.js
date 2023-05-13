function solution(number, k) {
    let answer = '';

    let cntRemoval = 0;
    let start = 0;

    while(cntRemoval < k){
        let max = -1;
        let idx;

        for(let i = start; i < start + k - cntRemoval + 1; i++){
            const newMax = Math.max(max, number[i]);
            if(max !== newMax){
                max = newMax;
                idx = i;
            }
            if(max === 9) break;
        }

        answer += max;
        cntRemoval += idx - start;
        start = idx + 1;
        
        if(answer.length >= number.length - k) return answer;
    }
    return answer + number.slice(start);
}