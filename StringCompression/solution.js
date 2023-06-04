function solution(s) {
    let minLen = s.length;
    
    // 압축 글자수
    for(let n = 1; n <= Math.floor(s.length / 2); n++){
        let compStr = '', compNum = 0;
        let cur = '', prev = '';

        for(let i = 0; i < s.length; i += n){
            cur = s.slice(i, i+n);

            if(prev === cur){
                compNum++;    
            }else{
                compStr += (compNum ? compNum + 1 : '') + prev;
                compNum = 0;
            }
            prev = cur;
        }
        compStr += (compNum ? compNum + 1 : '') + prev;

        minLen = Math.min(minLen, compStr.length);
    }
    return minLen;
}


// - 압축은 1부터 Math.floor(s.length / 2)개 까지만 가능하다.

// 1. 문자열 개수 n = 1부터 (s.length / 2)까지 순차적으로 단위를 적용해본다. (for)
// 2. 1번의 반복문 안에서 s의 index 0 ~ s.length 범위로 순회한다. index는 n 단위로 증가한다.
// 3. 이전 index(초기값 '')에서 저장했던 문자열과 현재 index를 비교한다.
//    - 이전 문자열과 현재 문자열이 같으면 compNum + 1
//    - 이전 문자열과 현재 문자열이 다르면 이전 압축 결과 compStr에 추가, 아래 둘 중 진행하고 compNum 초기화
//      - 압축 횟수가 0이면 그냥 문자열만 compStr에 추가
//      - 압축 횟수가 1 이상이면 압축횟수 + 1 + 문자열 을 compStr에 추가
// 4. 마지막으로 잘린 문자열은 for문 밖에서 압축횟수에 따라 처리해준다.
//      - 압축 횟수가 0이면 그냥 문자열만 compStr에 추가
//      - 압축 횟수가 1 이상이면 압축횟수 + 1 + 문자열 을 compStr에 추가
// 5. 2번의 반복문이 끝날 때마다 이전 length와 이번 순회에서의 compStr.length를 비교하여 더 짧으면 갱신
// 6. return length