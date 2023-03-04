<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>
<footer class="page-footer">
  <small>All rights reserved @B2k© Copyright {currentYear}. </small>
  <ul class="social-list flex">
    <li class="social-item">
      <a href="https://www.facebook.com/bhushan217" target="_blank" rel=noreferrer>
        <i class="logo-facebook"></i>
      </a>
    </li>
    <li class="social-item">
      <a href="https://www.twitter.com/bhushan217" target="_blank" rel=noreferrer>
        <i class="logo-twitter"></i>
      </a>
    </li>
    <li class="social-item">
      <a href="https://www.linkedin.com/in/bhushan217" target="_blank" rel=noreferrer>
        <i class="logo-linkedin"></i>
      </a>
    </li>
    <li class="social-item">
      <a href="https://www.github.com/bhushan217" target="_blank" rel=noreferrer>
        <i class="logo-github"></i>
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
  .social-list{
    min-width: 8rem;
    padding: 1rem 2rem;
    .social-item{
      min-width: 2rem;
      a{
        i{
          display: inline-block;
          @include square(2rem);
          &:hover{
            background-color: var(--primary);
          }
        }
      }
    }
  }
  </style>