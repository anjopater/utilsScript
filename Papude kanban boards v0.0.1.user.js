// ==UserScript==
// @name         Papude kanban boards v0.0.1
// @namespace
// @version      0.1
// @description  try to take over the world!
// @updateURL    https://github.com/anjopater/utilsScript/blob/master/Papude%20kanban%20boards%20v0.0.1.user.js
// @downloadURL  https://github.com/anjopater/utilsScript/blob/master/Papude%20kanban%20boards%20v0.0.1.user.js
// @author       You
// @match        https://dev.azure.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  "use strict";

  setInterval(function () {
    limitWIP();
    hideWIP();
    setStyleWipeLine();
  }, 2000);

  function paint() {
    let services = document.querySelectorAll(
      'div[field="Custom.TypeofService"] > div[class*="field-inner-element"]'
    );
    services.forEach((s) => {
      switch (s.innerText) {
        case "Intagível":
          s.style.border = "1px solid green";
          break;
        case "Urgente":
          s.style.border = "1px solid red";
          break;
        case "Data Fixa":
          s.style.border = "1px solid orange";
          break;
        default:
          s.style.border = "1px solid yellow";
          break;
      }
    });
  }
  setTimeout(function () {
    insertCol();
  }, 2000);

  //Limit WIP by user
  function limitWIP() {
    let users = document.querySelectorAll(".member-vertical");
    users.forEach((u) => {
      const header = u.querySelector(".member-header");
      const title = header.querySelector(
        ".swimlane-member-header .swimlane-header-title"
      );
      const wip = title.innerText.substring(
        title.innerText.lastIndexOf("(") + 1,
        title.innerText.lastIndexOf(")")
      );
      const members = u.querySelectorAll(".member-content .member .board-tile");
      let filteredMembers = Array.from(members).filter((n) => {
        const r = !/TO DEV|TO TEST/.test(
          n.querySelector("[field='System.BoardColumn'] .field-inner-element")
            .innerText
        );
        console.log(
          r,
          n.querySelector("[field='System.BoardColumn'] .field-inner-element")
            .innerText
        );
        return r;
      });
      const cols = u.querySelectorAll(
        ".agile-content-container .content-container .cell"
      );
      if (filteredMembers.length == parseInt(wip)) {
        cols.forEach((c, index) => {
          if (index !== 0) {
            c.style.backgroundColor = "#fce8e6";
          }
        });
      } else if (filteredMembers.length > parseInt(wip)) {
        cols.forEach((c, index) => {
          if (index !== 0) {
            c.style.backgroundColor = "#d93025";
          }
        });
      } else {
        cols.forEach((c, index) => {
          if (index !== 0) {
            c.style.backgroundColor = "transparent";
          }
        });
      }
    });
  }

  function hideWIP() {
    let wipis = document.querySelectorAll(".boards-controls-limit");
    wipis.forEach((s) => {
      s.style.display = "none";
    });
  }

  function setStyleWipeLine() {
    let users = document.querySelectorAll(".member-vertical");
    users.forEach((u) => {
      const header = u.querySelector(".member-header");
      header.style.marginLeft = "25%";
    });
  }
})();
