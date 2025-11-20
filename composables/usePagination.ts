export const usePagination = (initialPage: number = 1) => {
  const currentPage = ref(initialPage);
  const route = useRoute();
  const router = useRouter();

  // Sync with URL query params
  watch(
    () => route.query.page,
    (newPage) => {
      if (newPage) {
        const pageNum = parseInt(newPage as string);
        if (!isNaN(pageNum) && pageNum > 0) {
          currentPage.value = pageNum;
        }
      } else {
        currentPage.value = 1;
      }
    },
    { immediate: true }
  );

  const goToPage = (page: number) => {
    if (page >= 1) {
      currentPage.value = page;
      router.push({ query: { page } });
    }
  };

  return {
    currentPage: readonly(currentPage),
    goToPage,
  };
};

