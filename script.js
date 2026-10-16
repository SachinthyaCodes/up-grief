// Unpacking Grief donation page: small interactions, no dependencies.
(function () {
  'use strict';

  // ---- Funding meter: set data-filled on #boxes (0–17) ----
  var boxes = document.getElementById('boxes');
  if (boxes) {
    var filled = Math.max(0, Math.min(17, parseInt(boxes.getAttribute('data-filled'), 10) || 0));
    var cells = boxes.querySelectorAll('span');
    for (var i = 0; i < cells.length; i++) {
      if (i < filled) cells[i].classList.add('filled');
    }
    var label = filled + ' of 17 boxes funded';
    boxes.setAttribute('aria-label', label);
    document.querySelectorAll('.js-meter-text').forEach(function (el) { el.textContent = label; });
  }

  // ---- Mobile menu ----
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('mobile-menu');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('open', open);
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  }

  // ---- Sample password reveal ----
  var pwBtn = document.querySelector('.js-pw-toggle');
  var unlock = document.getElementById('sample-unlock');
  if (pwBtn && unlock) {
    pwBtn.addEventListener('click', function () {
      var open = !unlock.classList.contains('open');
      unlock.classList.toggle('open', open);
      pwBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) document.getElementById('sample-pw').focus();
    });
  }

  // ---- "Read the full story" (mobile) ----
  var storyBtn = document.querySelector('.js-story-toggle');
  var storyMore = document.getElementById('story-more');
  if (storyBtn && storyMore) {
    storyBtn.addEventListener('click', function () {
      storyMore.classList.add('open');
      storyBtn.setAttribute('aria-expanded', 'true');
      storyBtn.hidden = true;
    });
  }

  // ---- Donation amount picker ----
  var amountBtns = document.querySelectorAll('.amount');
  var impactText = document.getElementById('impact-text');
  var donateLabel = document.getElementById('donate-label');
  var other = document.getElementById('other-amount');
  var otherInput = document.getElementById('other-amt');
  function updateLabelFromOther() {
    var v = parseFloat(otherInput.value);
    donateLabel.textContent = v > 0 ? 'Donate $' + (Math.round(v * 100) / 100) : 'Donate';
  }
  amountBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      amountBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      var amt = parseInt(btn.getAttribute('data-amount'), 10);
      impactText.textContent = btn.getAttribute('data-impact');
      if (amt > 0) {
        other.classList.remove('open');
        donateLabel.textContent = 'Donate $' + amt;
      } else {
        other.classList.add('open');
        updateLabelFromOther();
        otherInput.focus();
      }
    });
  });
  if (otherInput) otherInput.addEventListener('input', updateLabelFromOther);

  // ---- Crew toggle ----
  var crewBtn = document.querySelector('.js-crew');
  var credits = document.getElementById('credits');
  if (crewBtn && credits) {
    crewBtn.addEventListener('click', function () {
      var open = !credits.classList.contains('show-all');
      credits.classList.toggle('show-all', open);
      crewBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      crewBtn.textContent = open ? 'Show fewer names' : 'Show the full crew (9 more)';
    });
  }

  // ---- Contact topic chips ----
  var chips = document.querySelectorAll('#topics .chip');
  function pickTopic(index) {
    chips.forEach(function (c, i) { c.setAttribute('aria-pressed', i === index ? 'true' : 'false'); });
  }
  chips.forEach(function (chip, i) {
    chip.addEventListener('click', function () { pickTopic(i); });
  });
  var requestSample = document.querySelector('.js-request-sample');
  if (requestSample) requestSample.addEventListener('click', function () { pickTopic(4); });
  document.querySelectorAll('.js-topic-link').forEach(function (a) {
    a.addEventListener('click', function () { pickTopic(parseInt(a.getAttribute('data-topic'), 10)); });
  });

  // ---- Copy page link ----
  var copyBtn = document.querySelector('.js-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var url = 'https://www.tell2cproductions.com/unpackinggrief';
      var done = function () { copyBtn.querySelector('.js-copy-label').textContent = 'Link copied'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, done);
      } else { done(); }
    });
  }

  // ---- Contact form (preview only: no backend on this static build) ----
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = 'Thank you. This preview form does not send messages yet.';
    });
  }
})();
