(function () {
  var header = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector("#site-nav");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("solid", window.scrollY > 8);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var form = document.querySelector("#order-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    var value = function (name) {
      return (form.elements[name].value || "").trim();
    };

    var lines = [
      "Please send me a copy of The Fin' Book.",
      "",
      "Copies: " + value("copies"),
      "Name: " + value("name"),
      "Email: " + value("email"),
      "Phone: " + (value("phone") || "—"),
      "Address: " + value("address"),
      "State: " + value("state"),
      "Postcode: " + value("postcode"),
      "Country: " + value("country"),
      "",
      value("note") ? "Note: " + value("note") : "",
      "",
      "$30 Australian, postage and packaging included, unless the website says the price has changed.",
      "Please allow 2–4 weeks for delivery after the order is accepted."
    ].filter(function (line, index, all) {
      return line !== "" || (all[index - 1] && all[index - 1] !== "");
    });

    var message = lines.join("\n").replace(/\n{3,}/g, "\n\n");
    var status = document.querySelector("#order-status");
    var copy = document.querySelector("#order-copy");
    if (copy) copy.textContent = message;
    if (status) status.hidden = false;

    window.location.href = "mailto:definagarry@gmail.com?subject=" +
      encodeURIComponent("Order for The Fin' Book") +
      "&body=" + encodeURIComponent(message);
  });
})();
