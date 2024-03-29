import React from "react";

import "./TermsOfService.css";

const TermsOfService = (props) => (
  <div className="TermsOfService-main-div">
    <div id="btn-div">
      <button
        className="tos-btn global-btn"
        onClick={() => props.history.goBack()}
      >
        Back
      </button>
      <button
        className="tos-btn global-btn"
        onClick={() => props.history.push("/")}
      >
        Home
      </button>
    </div>

    <h3>Terms of Service</h3>

    <div id="tos-text-div">
      <p className="tos-p">
        1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec
        molestie turpis. Nunc id mauris eget lectus congue euismod. Phasellus id
        urna lorem. Morbi vulputate laoreet leo at pellentesque. Pellentesque eu
        tincidunt ipsum. Aenean convallis dui ante, in vulputate magna tincidunt
        in. Aliquam lacinia interdum ipsum cursus scelerisque. Vivamus eget
        lacus pretium nisl cursus elementum. Etiam tincidunt elementum odio non
        ultricies.
      </p>

      <p className="tos-p">
        2. Vivamus augue nibh, ullamcorper ut nulla in, commodo gravida tellus.
        Morbi in auctor tellus, ac suscipit erat. Ut iaculis auctor euismod.
        Aenean hendrerit ligula eget vestibulum scelerisque. Sed a neque at mi
        tempor venenatis non et velit. Duis in nulla accumsan, sagittis diam sit
        amet, iaculis mauris. Etiam tristique nunc lacinia, pharetra turpis
        eget, lacinia mauris. Interdum et malesuada fames ac ante ipsum primis
        in faucibus.
      </p>

      <p className="tos-p">
        3. Pellentesque pulvinar feugiat ante in maximus. Aliquam pretium mauris
        ipsum, et imperdiet nunc egestas eget. In ornare, velit at mattis
        tincidunt, nisl odio dictum elit, non eleifend leo dui sed turpis. Donec
        eget aliquet orci, id rutrum dolor. Maecenas vitae sodales ipsum, a
        bibendum quam. Maecenas quis augue nec massa ornare pellentesque. Nunc
        fringilla bibendum ante vel ullamcorper. Aenean sollicitudin scelerisque
        tortor, vel viverra elit semper a. Vestibulum fermentum ex sit amet
        sagittis consectetur.
      </p>

      <p className="tos-p">
        4. Quisque pharetra sapien enim, non aliquet sem gravida nec. Nunc eu
        ante magna. Sed eu facilisis purus. Donec volutpat, diam sit amet
        vestibulum efficitur, diam urna egestas nulla, vitae posuere turpis
        felis ac justo. Curabitur pretium turpis eu vulputate euismod. Nunc in
        sapien in nunc porta dignissim. Proin lobortis ligula at leo volutpat,
        vitae egestas quam porttitor. Pellentesque ut interdum leo, at imperdiet
        purus. Nulla tincidunt facilisis ultrices. Curabitur ut mi ac ante
        fringilla tincidunt.
      </p>
    </div>
  </div>
);

export default TermsOfService;
