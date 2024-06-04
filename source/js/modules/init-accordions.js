export function initialAccordion() {
  const accordionItems = document.querySelectorAll('.faq__accordion-item');

  accordionItems.forEach((item) => {
    const accordionButton = item.querySelector('.faq__accordion-button');
    const accordionContent = item.querySelector('.faq__accordion-content');
    const accordionIcon = item.querySelector('.faq__accordion-icon');

    accordionButton.addEventListener('click', () => {
      toggleAccordion(item, accordionButton, accordionContent, accordionIcon);
    });

    if (item === accordionItems[2]) {
      openAccordion(item, accordionButton, accordionContent, accordionIcon);
    }
  });
}

function toggleAccordion(accordionItem, button, content, icon) {
  if (content.classList.contains('faq__accordion-content--active')) {
    closeAccordion(accordionItem, button, content, icon);
  } else {
    openAccordion(accordionItem, button, content, icon);
  }
}

function openAccordion(accordionItem, button, content, icon) {
  accordionItem.classList.add('faq__accordion-item--active');
  button.classList.add('faq__accordion-button--active');
  icon.classList.add('faq__accordion-icon--active');
  content.style.maxHeight = `${content.scrollHeight}px`;
  content.classList.add('faq__accordion-content--active');
}

function closeAccordion(accordionItem, button, content, icon) {
  accordionItem.classList.remove('faq__accordion-item--active');
  button.classList.remove('faq__accordion-button--active');
  icon.classList.remove('faq__accordion-icon--active');
  content.style.maxHeight = 0;
  content.classList.remove('faq__accordion-content--active');
}
