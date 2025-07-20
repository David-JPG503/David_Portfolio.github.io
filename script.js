document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('galleryModal');
  const mediaContainer = modal.querySelector('.modal-media-container');
  const closeBtn = modal.querySelector('.modal-close');
  const prevBtn = modal.querySelector('.modal-prev');
  const nextBtn = modal.querySelector('.modal-next');

  const projectMedia = {
    "Magazine CV": [
      { type: "image", src: "images/CV_magasin_forside.png" },
      { type: "image", src: "images/CV_magasin_about_me.png" },
      { type: "image", src: "images/CV_magasin_my_work.png" },
      { type: "image", src: "images/CV_magasin_my_work_mavericks.png" },
      { type: "image", src: "images/CV_magasin_økern_basket.png" }
    ],
    "Økern Basket IL": [
      { type: "image", src: "images/Designmanual.jpg" },
      { type: "image", src: "images/Basketball_Logo_Orginal_Bilde.png" },
      { type: "image", src: "images/Basketball_Logo_Vanlig_Version_2_Bilde.png" },
      { type: "image", src: "images/Mockup_White_Tank_Top_Original_Logo_Vanlig.jpg" },
      { type: "image", src: "images/Mockup_White_Tank_Top_Original_Logo_Monokrom.jpg" },
      { type: "image", src: "images/Mockup_Black_Tank_Top_Logo_Version_2_Vanlig.jpg" },
      { type: "image", src: "images/Mockup_White_Tank_Top_Logo_Version_2_Monokrom.jpg" },
      { type: "image", src: "images/Designmanual_Økern Basket IL_PNG.png" },
      { type: "image", src: "images/Økern Basket IL_Original icon_PNG.png" },
      { type: "image", src: "images/Økern Basket IL_PNG_Uten linjer.png" },
      { type: "image", src: "images/Økern Basket IL_ PNG_Text-logo_Brown.jpg" },
      { type: "image", src: "images/Mockups_Oppdrag2_PNG.png" }
    ],
    "Mavericks": [
      { type: "image", src: "images/Mavericks_red.jpg" },
      { type: "image", src: "images/Mavericks_orange.jpg" },
      { type: "image", src: "images/Mavericks_dungeon.jpg" },
      { type: "image", src: "images/Designmanualen_Bilde.jpg" },
      { type: "image", src: "images/Beanie Mockup Floating.png" }
    ],
    "Silhouette arts": [
      { type: "image", src: "images/Battle cats_uten_min_kallnavn_autograf.jpg" },
      { type: "image", src: "images/Jurassic Park_min_egen_versjon_bilde.jpg" }
    ],
    "Pixel arts": [
      { type: "image", src: "images/Mutated_Blender_Logo.png" },
      { type: "image", src: "images/Mutated_Blender_Logo_Gradient_Overlay.png" },
      { type: "image", src: "images/Swamp_Icons.png" },
      { type: "image", src: "images/PNG_Pixel_Overlay.png" },
      { type: "image", src: "images/PNG_Pixel_Soft-light.png" },
      { type: "image", src: "images/PNG_Pixel_Substract.png" }
    ],
    "Blender": [
      { type: "image", src: "images/Dangerous_chess_blender.png" },
      { type: "image", src: "images/Gun_watching_blender.png" }
    ],
    "ASCII art video": [
      { type: "video", src: "Videos/ASCII_Art_AE_video.mp4" }
    ]
  };


  let currentProject = null;
  let currentIndex = 0;

  function updateModalMedia() {
    const mediaItems = projectMedia[currentProject];
    const currentItem = mediaItems[currentIndex];

    mediaContainer.innerHTML = ''; // Clear previous media

    if (currentItem.type === 'image') {
      const img = document.createElement('img');
      img.src = currentItem.src;
      img.alt = `Screenshot ${currentIndex + 1} of ${currentProject}`;
      img.style.maxWidth = '90vw';
      img.style.maxHeight = '80vh';
      img.style.borderRadius = 'var(--radius)';
      mediaContainer.appendChild(img);
    } else if (currentItem.type === 'video') {
      const video = document.createElement('video');
      video.src = currentItem.src;
      video.controls = true;
      video.autoplay = true;
      video.style.maxWidth = '90vw';
      video.style.maxHeight = '80vh';
      video.style.borderRadius = 'var(--radius)';
      mediaContainer.appendChild(video);
    }
  }

  document.querySelectorAll('.view-project-btn').forEach(button => {
    button.addEventListener('click', () => {
      currentProject = button.closest('.project-card').dataset.project;
      currentIndex = 0;

      if (!projectMedia[currentProject]) return;

      updateModalMedia();
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  function showNextMedia() {
    if (!currentProject) return;
    const mediaItems = projectMedia[currentProject];
    currentIndex = (currentIndex + 1) % mediaItems.length;
    updateModalMedia();
  }

  function showPrevMedia() {
    if (!currentProject) return;
    const mediaItems = projectMedia[currentProject];
    currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    updateModalMedia();
  }

  nextBtn.addEventListener('click', e => {
    e.stopPropagation();
    showNextMedia();
  });

  prevBtn.addEventListener('click', e => {
    e.stopPropagation();
    showPrevMedia();
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    mediaContainer.innerHTML = '';
    currentProject = null;
    currentIndex = 0;
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBtn.click();
    }
  });

  // Keyboard navigation & close
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeBtn.click();
    } else if (e.key === 'ArrowRight') {
      showNextMedia();
    } else if (e.key === 'ArrowLeft') {
      showPrevMedia();
    }
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');
      const cards = document.querySelectorAll('.project-card');

      cards.forEach(card => {
        const type = card.getAttribute('data-type');
        card.style.display = (filter === 'all' || filter === type) ? 'flex' : 'none';
      });
    });
  });
});

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const errorDiv = document.getElementById("error-message");
    if (errorDiv) errorDiv.textContent = "";

    const submitBtn = document.getElementById("submit_btn");

    const formData = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value, // Optional
        message: document.getElementById("message").value,
    };

    emailjs.send("service_20ln28y", "template_j1ncgrq", formData)
        .then(function (response) {
            submitBtn.innerHTML = "Sent";
            submitBtn.disabled = true;
            document.getElementById("contact-form").reset();

            setTimeout(function () {
                submitBtn.innerHTML = "Send Message";
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch(function (error) {
            if (errorDiv) {
                errorDiv.textContent = "Failed to send message. Please try again.";
                errorDiv.style.color = "white";
            }
            console.error("EmailJS Error:", error);
        });
});