<script>
export default {};
</script>
<template>
  <nav>
    <ul>
      <div>
        <RouterLink to="/agendamentos" class="agendamentos">
          <li>
            <i class="bx bx-calendar-check"></i>
            <span class="agendamentos_link">agendamentos</span>
          </li>
        </RouterLink>
        <RouterLink to="/clientes" class="clientes">
          <li>
            <i class="bx bx-user-circle"></i>
            <span class="clientes_link">clientes</span>
          </li>
        </RouterLink>
        <RouterLink to="/pacotes" class="pacotes">
          <li>
            <i class="bx bx-package"></i>
            <span class="pacotes_link">pacotes</span>
          </li>
        </RouterLink>
        <RouterLink to="/procedimentos" class="procedimentos">
          <li>
            <i class="bx bxl-sketch"></i>
            <span class="procedimentos_link">procedimentos</span>
          </li>
        </RouterLink>
      </div>
    </ul>
  </nav>
</template>
<style scoped>
ul {
  list-style: none;
  width: fit-content;
  position: fixed;
  height: fit-content;
  background-color: #e17eb1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75rem;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 50px 0 rgba(#05043e, 0.25);
}

li:nth-child(6) {
  margin-top: 5rem;
  padding-top: 1.25rem;
  border-top: 1px solid white;
}

li + li {
  margin-top: 0.75rem;
}

a {
  color: #000;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 8px;
  position: relative;
}

a:hover,
a:focus,
a.active {
  background-color: #de6fa8;
  outline: 0;
}

a i {
  font-size: 1.375rem;
  color: white;
}

a span {
  position: absolute;
  background-color: #e4a5a5;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  left: calc(100% + 1.5rem);
  transform-origin: center left;
  transform: scale(0);
  opacity: 0;
  transition: 0.15s ease;
}

a span:before {
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  position: absolute;
  background-color: #e4a5a5;
  left: -5px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  border-radius: 3px;
}

@keyframes scale {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
