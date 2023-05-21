function solution(m, musicinfos) {
    let answer = null;

    for(let i = 0; i < musicinfos.length; i++){
        const [start, end, title, s] = musicinfos[i].split(",");
        const [sH, sM] = start.split(":"), [eH, eM] = end.split(":");
        const time = 60 * (+eH - +sH) + (+eM - +sM);

        const mArr = m.match(/.#?/g);
        let sArr = s.match(/.#?/g);

        while(sArr.length < time) sArr = sArr.concat(sArr);
        sArr.splice(time);
        
        for(let sIdx = 0, mIdx = 0; sIdx < sArr.length; sIdx++){
            if(sArr[sIdx] !== mArr[mIdx]) mIdx = 0;
            if(sArr[sIdx] === mArr[mIdx]) mIdx++;

            if(mIdx >= mArr.length){
                if((!answer || answer.time < time)) answer = {title, time};
                break;
            }
        }
    }
    return answer ? answer.title : "(None)";
}

// musicinfos를 순회하면서 체크해야할 것들
// 1. 노래 시간 
// 2. 노래시간에 맞게 재생된 곡
// 2번에 m이 포함되는지 체크
// => 재생된 곡의 계이름을 순회하면서, 들은 곡의 계이름이 연속으로 모두 나오는지 체크하는 과정 추가
// => 연속을 체크하는 과정에서, 연속되지 않았을 때 idx를 초기화 한 후 다시 한번더 체크해야함(반례)

// 노래 중 m이 포함되는 노래가 있다면 answer에 저장한다. 형태는 {노래제목, 노래길이}
// answer에 이미 노래가 있다면 노래길이를 비교하여 더 짧으면 덮어쓴다.