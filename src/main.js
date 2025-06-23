//import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('dangerButton');
  button.addEventListener('click', () => {
    Swal.fire({
      title: '경고!',
      text: '바보⎛⑉・⊝・⑉⎞',
      icon: 'warning',
      confirmButtonText: '누르지 말랬는데 왜눌렀어.',
      background: '#fff0f5', // 파스텔 배경
      confirmButtonColor: '#ff99aa',
    });
  });
});
