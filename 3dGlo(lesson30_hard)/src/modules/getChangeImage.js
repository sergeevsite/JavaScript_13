const getChangeImage = () => {
  const imgCommand = document.querySelectorAll('.command__photo');

  imgCommand.forEach((image, index) => {
    image.addEventListener('mouseover', (e) => {
      let target = e.target;
      target.src = target.dataset.img;
    });
    image.addEventListener('mouseout', (e) => {
      let target = e.target;
      target.src = target.dataset.img.replace(/[0-9]a/, index + 1)
    });
  });

};

export default getChangeImage;