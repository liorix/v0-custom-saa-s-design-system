import { render, screen, fireEvent } from "@testing-library/react"
import { Sidebar } from "@/components/ui/sidebar"

// Mock the useMobile hook
jest.mock("@/hooks/use-mobile", () => ({
  useMobile: jest.fn().mockReturnValue(true), // Default to mobile view
}))

describe("Sidebar Component", () => {
  it("renders correctly", () => {
    render(<Sidebar>Test Content</Sidebar>)
    expect(screen.getByText("Sidebar")).toBeInTheDocument()
    expect(screen.getByText("Test Content")).toBeInTheDocument()
  })

  it("applies open class when open prop is true", () => {
    render(<Sidebar open={true}>Test Content</Sidebar>)
    const sidebar = screen.getByRole("complementary")
    expect(sidebar).toHaveClass("translate-x-0")
  })

  it("applies closed class when open prop is false", () => {
    render(<Sidebar open={false}>Test Content</Sidebar>)
    const sidebar = screen.getByRole("complementary")
    expect(sidebar).toHaveClass("-translate-x-full")
  })

  it("calls onOpenChange when close button is clicked", () => {
    const handleOpenChange = jest.fn()
    render(
      <Sidebar open={true} onOpenChange={handleOpenChange}>
        Test Content
      </Sidebar>,
    )

    const closeButton = screen.getByLabelText("Close sidebar")
    fireEvent.click(closeButton)

    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })

  it("calls onOpenChange when overlay is clicked", () => {
    const handleOpenChange = jest.fn()
    render(
      <Sidebar open={true} onOpenChange={handleOpenChange}>
        Test Content
      </Sidebar>,
    )

    const overlay = document.querySelector('[aria-hidden="true"]')
    if (overlay) {
      fireEvent.click(overlay)
      expect(handleOpenChange).toHaveBeenCalledWith(false)
    } else {
      throw new Error("Overlay not found")
    }
  })

  it("closes when escape key is pressed", () => {
    const handleOpenChange = jest.fn()
    render(
      <Sidebar open={true} onOpenChange={handleOpenChange}>
        Test Content
      </Sidebar>,
    )

    fireEvent.keyDown(document, { key: "Escape" })
    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })
})
