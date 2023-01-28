
  <footer class="page-footer">
    <small>© Copyright 2018. All rights reserved.</small>
    <ul>
      <li>
        <a href="/#" target="_blank">
          <i class="icon ion-logo-facebook"></i>
        </a>
      </li>
      <li>
        <a href="/#" target="_blank">
          <i class="icon ion-logo-twitter"></i>
        </a>
      </li>
      <li>
        <a href="/#" target="_blank">
          <i class="icon ion-logo-linkedin"></i>
        </a>
      </li>
      <li>
        <a href="/#" target="_blank">
          <i class="icon ion-logo-github"></i>
        </a>
      </li>
    </ul>
  </footer>
  <style lang="scss">
    @use '../../styles/index.scss' as *;
    .page-footer {
  display: flex;
  flex-direction: column-reverse;
}
.page-footer ul {
  display: flex;
  font-size: 1.5rem;
  margin-bottom: 5px;
}
@media screen and (min-width: 550px) {
  .page-footer {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .page-footer ul {
    margin-bottom: 0;
  }
}
  </style>