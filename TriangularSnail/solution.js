function solution(n) {
    const answer = new Array(n).fill().map((_, i) => {
        const arr = new Array(i+1).fill(undefined);
        arr[0] = i+1;
        return arr;
    });
    const max = (n * (1 + n)) / 2;
    let el = n + 1;
    let col = 0, row = n - 1;

    if(n === 1) return [1];

    outer : while(true){
        for(let i = col + 1; !answer[row][i] && i < n; i++, el++){
            col = i
            answer[row][i] = el;
            if(el >= max) break outer;
        }

        for(let i = row - 1; !answer[i][col-1]; i--, el++){
            row = i;
            col--;
            answer[i][col] = el;
            if(el >= max) break outer;
        }

        for(let i = row + 1; !answer[i][col]; i++, el++){
            row = i;
            answer[i][col] = el;    
            if(el >= max) break outer;
        }
    }

    return answer.reduce((a, c) => a.concat(c), []);
    // = Array.flat() 
}
