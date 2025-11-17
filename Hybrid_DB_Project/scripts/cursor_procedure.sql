-- =====================================================
-- Cursor-based Stored Procedure for Inventory Summary
-- =====================================================
-- This procedure uses a CURSOR to iterate through products,
-- calculate inventory statistics, and update inventory_summary table
-- =====================================================

CREATE OR REPLACE FUNCTION test_cursor_proc()
RETURNS TABLE(
    total_products INTEGER,
    total_stock_value DECIMAL,
    low_stock_count INTEGER,
    out_of_stock_count INTEGER
) AS $$
DECLARE
    product_rec RECORD;
    v_total_products INTEGER := 0;
    v_total_stock_value DECIMAL(12, 2) := 0;
    v_low_stock_count INTEGER := 0;
    v_out_of_stock_count INTEGER := 0;
    v_product_value DECIMAL(12, 2);
    
    -- Declare cursor to iterate through all active products
    product_cursor CURSOR FOR
        SELECT 
            product_id,
            name,
            stock_quantity,
            min_stock_level,
            price,
            cost_price
        FROM products
        WHERE is_active = TRUE
        ORDER BY product_id;
BEGIN
    -- Open the cursor
    OPEN product_cursor;
    
    -- Loop through all products using the cursor
    LOOP
        -- Fetch next row from cursor
        FETCH product_cursor INTO product_rec;
        
        -- Exit loop when no more rows
        EXIT WHEN NOT FOUND;
        
        -- Increment product count
        v_total_products := v_total_products + 1;
        
        -- Calculate product value (use cost_price if available, otherwise use price * 0.7 as estimated cost)
        IF product_rec.cost_price IS NOT NULL AND product_rec.cost_price > 0 THEN
            v_product_value := product_rec.cost_price * product_rec.stock_quantity;
        ELSE
            v_product_value := COALESCE(product_rec.price * 0.7, 0) * product_rec.stock_quantity;
        END IF;
        
        -- Add to total stock value
        v_total_stock_value := v_total_stock_value + v_product_value;
        
        -- Check for low stock (stock <= min_stock_level)
        IF product_rec.stock_quantity <= product_rec.min_stock_level THEN
            v_low_stock_count := v_low_stock_count + 1;
        END IF;
        
        -- Check for out of stock
        IF product_rec.stock_quantity = 0 THEN
            v_out_of_stock_count := v_out_of_stock_count + 1;
        END IF;
        
    END LOOP;
    
    -- Close the cursor
    CLOSE product_cursor;
    
    -- Insert summary into inventory_summary table
    INSERT INTO inventory_summary (
        total_products,
        total_stock_value,
        low_stock_count,
        out_of_stock_count,
        last_updated
    ) VALUES (
        v_total_products,
        v_total_stock_value,
        v_low_stock_count,
        v_out_of_stock_count,
        CURRENT_TIMESTAMP
    );
    
    -- Return the calculated values
    RETURN QUERY SELECT 
        v_total_products,
        v_total_stock_value,
        v_low_stock_count,
        v_out_of_stock_count;
    
END;
$$ LANGUAGE plpgsql;

-- Add comment for documentation
COMMENT ON FUNCTION test_cursor_proc() IS 
'Cursor-based procedure that iterates through all active products, calculates inventory statistics (total products, stock value, low stock count, out of stock count), and inserts a summary record into inventory_summary table. Returns the calculated statistics.';

