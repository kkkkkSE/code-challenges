function solution(relation) {
  const visited = new Array(relation[0].length).fill(0);
  const colLen = relation[0].length, rowLen = relation.length;
  const uniquenessKey = new Set(); // 유일성 만족하는 키

  // 모든 후보키 조합 탐색
  function helper (start, visit){
    for(let i = start; i < colLen; i++){
      const tupleArr = [];
      let key = '';

      if(!visit[i]){
        visit[i] = 1;

        // 현재 탐색중인 후보키의 속성 값만 모아놓은 배열 추출(tupleArr);
        relation.forEach(row => {
          tupleArr.push((row.filter((_, i) => visit[i]).join("")));
        });

        if(new Set(tupleArr).size === tupleArr.length) {
          // 유일성 만족하는 키 저장
          key = visit.join("");
          uniquenessKey.add(parseInt(key, 2));
        }

        helper(i+1, visit);

        visit[i] = 0;
      }
    }
  }

  helper(0, visited);
    
  // 최소성 만족하는 키 찾기
  const uniquenessKeyArr = [...uniquenessKey];

  for(let i = 0; i < uniquenessKeyArr.length; i++){
    const key1 = uniquenessKeyArr[i];
    for(let j = 0; j < uniquenessKeyArr.length; j++){
      const key2 = uniquenessKeyArr[j];

      if((key1 !== key2) && ((key1 & key2) === key1)) {
        uniquenessKey.delete(key2);
      }
    } 
  }

  return uniquenessKey.size;
}

// 후보키가 되는 경우의 수를 찾는 문제.
// 후보키의 속성은 1개보다 많을 수 있지만, 최소성을 만족해야 함.
// 어떤 속성 하나만으로 유일성이 유지된다면 그 속성을 포함하여 다른 속성을 포함한 후보키는 최소성을 만족하지 못한 것


// col의 모든 조합 경우의 수를 방문할 수 있는 헬퍼 함수를 만들자. (완전 탐색)
// visit 배열은 현재 살펴보고있는 후보키를 나타낸다. 

// 완전 탐색을 실행하면서, 현재 탐색중인 후보키가 유일성을 만족하는지 체크한다
// => 후보키에 해당하는 모든 속성 값들을 각 튜플마다 문자열로 합쳐서 tupleArr에 저장한다.
//    이 배열을 Set에 저장한 것과, 배열의 길이를 비교하여 유일성을 만족하는지 확인한다.
//    => 만족한다면 uniquenessKey (Set)에 담는다.
// 유일성을 만족하는 키의 집합인 uniquenessKey 중 최소성을 만족하는 후보키를 찾는다.
// => key1 & key2 === key1 일 때, key2는 key1를 포함하고 있다는 의미이므로 집합에서 key2를 삭제
//    단, key1 === key2 일 때, key2가 제거된다는 것은 Key1가 제거된다는 의미이므로 예외로 둔다.
// 마지막으로 uniquenessKey의 size를 반환



//// 

// 헬퍼함수의 실행이 모두 끝나면, 후보키들이 담긴 배열을 길이 오름차순으로 정렬한다.
// 후보키들이 담긴 배열을 순회하면서, new 후보키는 바깥의 배열에 기록한다.
// 후보키들이 담긴 배열을 순회하면서, new 후보키 중 하나가 포함되어 있다면 후보키로 등록하지 않는다.

// -> 해당 방법을 includes로 해결하려 했으나 테스트케이스 일부에서 실패함. 다른방법 모색

////  