<script setup></script>

<template>
    <header class="header">
        <nav class="header__navigation">
            <RouterLink class="header__link" to="/">На страницу формы</RouterLink>

            <RouterLink class="header__link" to="/result">На страницу результатов</RouterLink>
        </nav>
    </header>

    <RouterView></RouterView>
</template>

<style lang="scss" scoped>
.header {
    &__navigation {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #707070;
    }

    &__link {
        padding: 2rem;
        text-decoration: none;
        color: #ffffff;

        &:hover {
            background: #4e4e4e;
        }
    }
}
</style>
