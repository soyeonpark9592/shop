let basket = {
    totalCount: 0, 
    totalPrice: 0,
    //체크한 장바구니 상품 비우기
    delCheckedItem: function(){
        document.querySelectorAll("input[name=buy]:checked").forEach(function (item) {
            item.parentElement.parentElement.parentElement.remove();
        });
        //AJAX 서버 업데이트 전송
    
        //전송 처리 결과가 성공이면
        this.reCalc();
        this.updateUI();
    },
    //장바구니 전체 비우기
    delAllItem: function(){
        document.querySelectorAll('.row.data').forEach(function (item) {
            item.remove();
          });
          //AJAX 서버 업데이트 전송
        
          //전송 처리 결과가 성공이면
          this.totalCount = 0;
          this.totalPrice = 0;
          this.reCalc();
          this.updateUI();
    },
    //재계산
    reCalc: function(){
        this.totalCount = 0;
        this.totalPrice = 0;
        document.querySelectorAll(".p_num").forEach(function (item) {
            if(item.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.checked == true){
                var count = parseInt(item.getAttribute('value'));
                this.totalCount += count;
                var price = item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute('value');
                this.totalPrice += count * price;
            }
        }, this); // forEach 2번째 파라메터로 객체를 넘겨서 this 가 객체리터럴을 가리키도록 함. - thisArg
    },
    //화면 업데이트
    updateUI: function () {
        document.querySelector('#sum_p_num').textContent = '상품갯수: ' + this.totalCount.formatNumber() + '개';
        document.querySelector('#sum_p_price').textContent = '합계금액: ' + this.totalPrice.formatNumber() + '원';
    },
    //개별 수량 변경
    changePNum: function (pos) {
        var item = document.querySelector('input[name=p_num'+pos+']');
        var p_num = parseInt(item.getAttribute('value'));
        var newval = event.target.classList.contains('up') ? p_num+1 : event.target.classList.contains('down') ? p_num-1 : event.target.value;
        
        if (parseInt(newval) < 1 || parseInt(newval) > 99) { return false; }

        item.setAttribute('value', newval);
        item.value = newval;

        var price = item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute('value');
        item.parentElement.parentElement.nextElementSibling.textContent = (newval * price).formatNumber()+"원";
        //AJAX 업데이트 전송

        //전송 처리 결과가 성공이면    
        this.reCalc();
        this.updateUI();
    },
    checkItem: function () {
        this.reCalc();
        this.updateUI();
    },
    delItem: function () {
        event.target.parentElement.parentElement.parentElement.remove();
        this.reCalc();
        this.updateUI();
    }
}

// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function(){
    if(this==0) return 0;
    let regex = /(^[+-]?\d+)(\d{3})/;
    let nstr = (this + '');
    while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
    return nstr;
};

/*
arr.forEach(callback(currentvalue[, index[, array]])[, thisArg])
callback
각 요소에 대해 실행할 함수. 다음 세 가지 매개변수를 받습니다.

currentValue
처리할 현재 요소.

index
처리할 현재 요소의 인덱스.<

array
forEach()를 호출한 배열.

thisArg
callback을 실행할 때 this로 사용할 값.
forEach()는 주어진 callback을 배열에 있는 각 요소에 대해 오름차순으로 한 번씩 실행합니다. 삭제했거나 초기화하지 않은 인덱스 속성에 대해서는 실행하지 않습니다. (예: 희소 배열)

반환 값
undefined.


callback은 다음 세 인수와 함께 호출됩니다.

요소 값
요소 인덱스
순회 중인 배열
thisArg 매개변수를 forEach()에 제공한 경우 callback을 호출할 때 전달해 this의 값으로 쓰입니다. 전달하지 않으면 undefined를 사용하며, 최종 this 값은 함수의 this를 결정하는 평소 규칙을 따릅니다.

forEach()로 처리할 요소의 범위는 최초 callback 호출 전에 설정됩니다. forEach() 호출을 시작한 뒤 배열에 추가한 요소는 callback이 방문하지 않습니다. 배열의 기존 요소값이 바뀐 경우, callback에 전달하는 값은 forEach()가 요소를 방문한 시점의 값을 사용합니다. 방문하기 전에 삭제한 요소는 방문하지 않습니다.

forEach()는 각 배열 요소에 대해 한 번씩 callback 함수를 실행합니다. map()과 reduce()와는 달리 undefined를 반환하기 때문에 메서드 체인의 중간에 사용할 수 없습니다. 대표적인 사용처는 메서드 체인 끝에서 부작용(side effect)을 실행하는 겁니다.

forEach()는 배열을 변형하지 않습니다. 그러나 callback이 변형할 수는 있습니다.

thisArg 사용
다음 예제는 배열의 각 항목에서 객체의 속성을 갱신합니다:

function Counter() {
  this.sum = 0
  this.count = 0
}
Counter.prototype.add = function(array) {
  array.forEach(function(entry) {
    this.sum += entry
    ++this.count
  }, this)
  // ^---- 주의
}

const obj = new Counter()
obj.add([2, 5, 9])
obj.count
// 3
obj.sum
// 16
Copy to Clipboard
thisArg 매개변수(this)를 forEach()에 제공했기에, callback은 전달받은 this의 값을 자신의 this 값으로 사용할 수 있습니다.

*/