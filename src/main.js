import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('dangerButton');
  button.addEventListener('click', () => {
    Swal.fire({
      title: '경고!',
      text: '클릭하지 말라고 했잖아요!',
      icon: 'warning',
      confirmButtonText: '죄송합니다...',
      background: '#fff0f5', // 파스텔 배경
      confirmButtonColor: '#ff99aa',
    });
  });
});
