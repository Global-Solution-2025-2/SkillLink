export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] dark:bg-[#145374] text-[#C8D6E5] dark:text-[#F9F9F9] text-center py-3 mt-auto transition-colors duration-300">
      <div className="flex items-center justify-center space-x-2 text-sm">
        <div className="w-4 h-4 bg-[#00B894] rounded-full"></div>
        <span>© {new Date().getFullYear()} SkillLink</span>
      </div>
    </footer>
  );
}
