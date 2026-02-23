import { ref } from 'vue'

export function useDropdown() {
    const openDropdownId = ref(null)

    const toggleDropdown = (id) => {
        openDropdownId.value = openDropdownId.value === id ? null : id
    }

    const closeDropdown = () => {
        openDropdownId.value = null
    }

    return {
        openDropdownId,
        toggleDropdown,
        closeDropdown,
    }
}
