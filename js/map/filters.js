const form = document.querySelector('.map__filters');
const fieldsets = form.querySelectorAll('fieldset');
const selects = form.querySelectorAll('select');

const activateFilters = () => {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  selects.forEach((select) => {
    select.disabled = false;
  });
};

const deactivateFilters = () => {
  form.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  selects.forEach((select) => {
    select.disabled = true;
  });
};

const getAnnouncementRank = (announcement) => {
  const housingType = document.querySelector('#housing-type');
  let rank = 0;
  if (announcement.offer?.type === housingType.value) {
    rank++;
  }
  return rank;
};

const compareAnnouncements = (announcementA, announcementB) => {
  const rankA = getAnnouncementRank(announcementA);
  const rankB = getAnnouncementRank(announcementB);

  return rankB - rankA;
};

const applyFilters = (announcements, itemLimit = 10) => announcements.toSorted(compareAnnouncements).slice(0, itemLimit);

export { activateFilters, deactivateFilters, applyFilters };
