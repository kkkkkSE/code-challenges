function solution(n) {
    const arr = [undefined, 1, 2];

    for(let i = 3; i <= n; i++){
        arr[i] = (arr[i-2] + arr[i-1]) % 1000000007;
    }
    
    return arr[n];
}

// n = 7까지 경우의 수를 직접 그려보고, 어떤 패턴으로 경우의 수가 증가하는지 파악하기.
// 이미지 첨부 완료