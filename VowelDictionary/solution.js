function solution(word) {
    const vowel = {A:1, E:2, I:3, O:4, U:5};
    const strToNum = [0,0,0,0,0];
    let wordToNum = '';
    let count = 0

    // word를 숫자 형태로 변환
    for(let i = 0; i < 5; i++) {
        if(vowel[word[i]]) wordToNum += vowel[word[i]];
        else wordToNum += '0';
    }

    // 00000부터 차례로 올라가면서 카운트
    while(strToNum.join("") !== wordToNum){
        count++;
        
        // 5글자 미만이라면 A 채우기
        if(strToNum.indexOf(0) > -1) {
            strToNum[strToNum.indexOf(0)] = 1;
            continue;
        }

        strToNum[4] += 1;

        // 자리 올림
        for(let j = 4; j > 0; j--){
            if(strToNum[j] > 5) {
                strToNum[j] = 0;
                strToNum[j-1] += 1;
            } else break;
        }
    }

    return count;
}
// 1) a=1 e=2 i=3 o=4 u=5, 0은 문자 없음 (ex. AE 는 12000 으로 표시)
// 2) 숫자 양끝 사이에는 0이 올 수 없으므로 (10001 이런 숫자는 불가능) 
// 앞자리부터 1을 채워준다. (12000(AE) 다음은 12001이 아닌 12100(AEA));
// 3) 1을 다 채웠으면 +1 씩 올려주기, 이 과정에서 자리올림 해줘야함

solution('AAAAE') // 6
solution('AAAE') // 10
solution('I') // 1563
solution('EIO') // 1189